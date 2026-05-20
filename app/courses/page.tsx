"use client";

import React, { useEffect, useState } from "react";
import { CourseList } from "@/components/sections/CourseViews";
import { useCms } from "@/components/cms/useCms";
import type { Course } from "@/components/cms/types";
import dbFallback from "@/lib/fallbackDb.json";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const { getCourses } = useCms();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const fetchedCourses = await getCourses();
      if (!fetchedCourses || fetchedCourses.length === 0) {
        setCourses((dbFallback as any).courses as Course[]);
      } else {
        setCourses(fetchedCourses);
      }
      setLoading(false);
    }
    fetchData();
  }, [getCourses]);

  if (loading) return <p>Loading training courses...</p>;

  return (
    <CourseList 
      courses={courses} 
      onSelect={(id) => router.push(`/courses/${id}`)} 
    />
  );
}
