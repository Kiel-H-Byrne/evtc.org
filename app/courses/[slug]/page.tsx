"use client";

import React, { useEffect, useState } from "react";
import { CourseDetail } from "@/components/sections/CourseViews";
import { LessonModal } from "@/components/sections/LessonModal";
import { useCms } from "@/components/cms/useCms";
import type { Course, Lesson } from "@/components/cms/types";
import dbFallback from "@/lib/fallbackDb.json";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { getCourses } = useCms();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedCourses = await getCourses();
      const allCourses = (!fetchedCourses || fetchedCourses.length === 0)
        ? (dbFallback as any).courses as Course[]
        : fetchedCourses;
      
      const found = allCourses.find((c: Course) => c.slug === slug || c.id === slug);
      setCourse(found || null);
      setLoading(false);
    }
    fetchData();
  }, [getCourses, slug]);

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
