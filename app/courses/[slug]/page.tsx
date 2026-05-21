"use client";

import type { Course, Lesson } from "@/components/cms/types";
import { useCms } from "@/components/cms/useCms";
import { CourseDetail } from "@/components/sections/CourseViews";
import { LessonModal } from "@/components/sections/LessonModal";
import dbFallback from "@/lib/fallbackDb.json";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();
  const { getCourses } = useCms();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        console.warn("CourseDetailPage: No slug found in params", params);
        // If no slug, we can't find anything
        setLoading(false);
        return;
      }

      // Ensure we have a string slug
      const slugVal = Array.isArray(slug) ? slug[0] : slug;

      console.log("CourseDetailPage: fetching courses for slug:", slugVal);
      const fetchedCourses = await getCourses();

      const allCourses =
        !fetchedCourses || fetchedCourses.length === 0
          ? ((dbFallback as any).courses as Course[])
          : fetchedCourses;

      console.log(
        "CourseDetailPage: allCourses total count:",
        allCourses.length,
      );

      const targetSlug =
        typeof slugVal === "string"
          ? decodeURIComponent(slugVal).toLowerCase()
          : "";

      if (!targetSlug) {
        console.warn("CourseDetailPage: targetSlug is empty after processing");
        setLoading(false);
        return;
      }

      const found = allCourses.find((c: Course) => {
        const courseSlug = c.slug?.toLowerCase();
        const courseId = c.id?.toLowerCase();
        return (
          (courseSlug && courseSlug === targetSlug) ||
          (courseId && courseId === targetSlug)
        );
      });

      if (!found) {
        console.warn(
          "CourseDetailPage: course not found for slug:",
          targetSlug,
          "Available IDs:",
          allCourses.map((c) => c.id),
        );
      } else {
        console.log("CourseDetailPage: found course:", found.name);
      }

      setCourse(found || null);
      setLoading(false);
    }
    fetchData();
  }, [getCourses, slug, params]);

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <>
      <CourseDetail
        course={course}
        onLessonClick={(lesson) => setActiveLesson(lesson)}
      />

      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </>
  );
}
