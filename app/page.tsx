"use client";

import React, { useState, useEffect } from "react";
import { AppContainer, Header, Main, Section } from "@/components/ui/Styled";
import { HeroSVG } from "@/components/ui/HeroSVG";
import { NavigationBar } from "@/components/layout/Navigation";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { CourseList, CourseDetail } from "@/components/sections/CourseViews";
import { LessonModal } from "@/components/sections/LessonModal";
import { AboutSection, ContactSection } from "@/components/sections/InfoSections";
import { useCms } from "@/components/cms/useCms";
import type { Course, Lesson, AboutContent, ContactContent } from "@/components/cms/types";

// -------------------- FALLBACK DATABASE --------------------
// This fallback is used while the Sanity CMS schema is unpopulated.
import dbFallback from "@/lib/fallbackDb.json";

export default function HomePage() {
  const { getCourses, getAboutContent, getContactContent } = useCms();
  
  // State
  const [tab, setTab] = useState("about");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Data State
  const [courses, setCourses] = useState<Course[]>([]);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      // Attempt to fetch from CMS
      const [fetchedCourses, fetchedAbout, fetchedContact] = await Promise.all([
        getCourses(),
        getAboutContent(),
        getContactContent()
      ]);

      if (!active) return;

      // Fallback logic if Sanity hasn't been populated with EVTC data yet
      if (!fetchedCourses || fetchedCourses.length === 0) {
        setCourses(dbFallback.courses as unknown as Course[]);
        setAbout(dbFallback.about as AboutContent);
        setContact(dbFallback.contact as ContactContent);
      } else {
        setCourses(fetchedCourses);
        setAbout(fetchedAbout);
        setContact(fetchedContact);
      }
      setLoading(false);
    }
    fetchData();

    return () => {
      active = false;
    };
  }, [getCourses, getAboutContent, getContactContent]);

  // Handlers
  function handleTabChange(key: string) {
    setTab(key);
    setSelectedCourseId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCourseSelect(id: string) {
    setSelectedCourseId(id);
    setTab("courses");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStartRegistration(courseId: string) {
    setSelectedCourseId(courseId);
    setTab("registration");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <AppContainer>
      <Header>
        <h1 style={{ marginBottom: 0, fontFamily: "var(--font-heading)", fontSize: "2.2rem" }}>
          Elite Vocational Training Center
        </h1>
        <div style={{ margin: "1em 0" }}>
          <HeroSVG />
        </div>
      </Header>

      <NavigationBar 
        currentTab={tab} 
        onTabChange={handleTabChange} 
        courses={courses} 
        selectedCourseId={selectedCourseId}
        onCourseSelect={handleCourseSelect}
      />

      <Main>
        {loading ? (
          <Section>
            <h2>Loading application data...</h2>
          </Section>
        ) : (
          <>
            {/* About Us */}
            {tab === "about" && <AboutSection content={about} />}

            {/* Contact Us */}
            {tab === "contact" && <ContactSection content={contact} />}

            {/* Registration/Onboarding */}
            {tab === "registration" && (
              <RegistrationForm 
                courses={courses} 
                preselectedCourseId={selectedCourseId || undefined} 
              />
            )}

            {/* Courses List */}
            {tab === "courses" && !selectedCourseId && (
              <CourseList courses={courses} onSelect={handleCourseSelect} />
            )}

            {/* Course Detail */}
            {tab === "courses" && selectedCourse && (
              <CourseDetail 
                course={selectedCourse} 
                onBack={() => setSelectedCourseId(null)}
                onRegister={handleStartRegistration}
                onLessonClick={(lesson) => setActiveLesson(lesson)}
              />
            )}
          </>
        )}
      </Main>

      {/* Lesson Details Modal */}
      {activeLesson && (
        <LessonModal 
          lesson={activeLesson} 
          onClose={() => setActiveLesson(null)} 
        />
      )}
    </AppContainer>
  );
}
