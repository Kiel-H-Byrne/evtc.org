"use client";

import React, { useEffect, useState, Suspense } from "react";
import { ContactEnrollmentForm } from "@/components/sections/ContactEnrollmentForm";
import { useCms } from "@/components/cms/useCms";
import type { Course, ContactContent } from "@/components/cms/types";
import dbFallback from "@/lib/fallbackDb.json";
import { useSearchParams } from "next/navigation";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const preselectedCourseId = searchParams.get("courseId") || undefined;

  const { getCourses, getContactContent } = useCms();
  const [courses, setCourses] = useState<Course[]>([]);
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [fetchedCourses, fetchedContact] = await Promise.all([
        getCourses(),
        getContactContent()
      ]);

      if (!fetchedCourses || fetchedCourses.length === 0) {
        setCourses((dbFallback as any).courses as Course[]);
      } else {
        setCourses(fetchedCourses);
      }

      if (!fetchedContact) {
        setContact(dbFallback.contact as ContactContent);
      } else {
        setContact(fetchedContact);
      }
      setLoading(false);
    }
    fetchData();
  }, [getCourses, getContactContent]);

  if (loading) return <p>Loading contact information...</p>;

  return (
    <ContactEnrollmentForm 
      courses={courses} 
      preselectedCourseId={preselectedCourseId}
      contactInfo={contact}
    />
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<p>Loading contact form...</p>}>
      <ContactPageContent />
    </Suspense>
  );
}
