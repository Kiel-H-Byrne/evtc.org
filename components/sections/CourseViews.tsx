"use client";
import React from "react";
import styled from "styled-components";
import { Section, CourseCard, Button } from "@/components/ui/Styled";
import type { Course, Lesson } from "@/components/cms/types";

const LessonList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LessonItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75em 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.background};
  &:last-child { border-bottom: none; }
`;

const LockIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16" data-component="LockIcon" aria-label="Locked" style={{ marginLeft: "0.5em" }}>
    <rect x="4" y="7" width="8" height="5" rx="1.5" fill="var(--theme-accent)" stroke="var(--theme-foreground)" />
    <path d="M8 7V5.5A2.5 2.5 0 0 1 13 5.5V7" stroke="var(--theme-foreground)" strokeWidth="1.2" />
    <circle cx="8" cy="10" r="1" fill="var(--theme-foreground)" />
  </svg>
);

export function CourseList({ courses, onSelect }: { courses: Course[], onSelect: (id: string) => void }) {
  if (courses.length === 0) {
    return (
      <Section>
        <h2>Training Courses</h2>
        <p>No courses are currently available. Please check back later.</p>
      </Section>
    );
  }

  return (
    <Section>
      <h2 style={{ marginBottom: "1em", color: "var(--theme-foreground)" }}>Training Courses</h2>
      {courses.map((course) => (
        <CourseCard key={course.id}>
          <h3 style={{ margin: 0, fontSize: "1.4rem", color: "var(--theme-primary)" }}>{course.name}</h3>
          <p style={{ margin: "0.5em 0" }}>{course.description}</p>
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.95em", marginBottom: "1em" }}>
            <strong style={{ color: "var(--theme-primary)" }}>Schedule:</strong> {course.schedule} <br />
            <strong style={{ color: "var(--theme-primary)" }}>Price:</strong> {course.price > 0 ? `$${course.price.toLocaleString()} USD` : "TBD"}
          </div>
          <div>
            <Button onClick={() => onSelect(course.id)}>View Course Details</Button>
          </div>
        </CourseCard>
      ))}
    </Section>
  );
}

export function CourseDetail({ 
  course, 
  onBack, 
  onRegister,
  onLessonClick 
}: { 
  course: Course, 
  onBack: () => void, 
  onRegister: (courseId: string) => void,
  onLessonClick: (lesson: Lesson) => void 
}) {
  return (
    <Section>
      <button
        style={{ background: "none", border: "none", color: "var(--theme-text-secondary)", cursor: "pointer", marginBottom: "1em", display: "flex", alignItems: "center", gap: "0.5em" }}
        onClick={onBack}
      >
        <span>←</span> Back to Courses
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1em" }}>
        <h2 style={{ margin: 0, color: "var(--theme-primary)", flex: "1 1 auto" }}>{course.name}</h2>
        <Button onClick={() => onRegister(course.id)}>Enroll Now</Button>
      </div>

      <p style={{ fontSize: "1.1rem", lineHeight: 1.6, margin: "1.5em 0" }}>{course.description}</p>
      
      <div style={{ background: "var(--theme-background)", padding: "1.5em", borderRadius: "8px", marginBottom: "2em" }}>
        <strong style={{ color: "var(--theme-primary)" }}>Schedule:</strong> {course.schedule} <br />
        <strong style={{ color: "var(--theme-primary)" }}>Price:</strong> {course.price > 0 ? `$${course.price.toLocaleString()} USD` : "TBD"}
        {course.extraMaterial && (
          <>
            <br />
            <strong style={{ color: "var(--theme-primary)" }}>Extra Material:</strong> {course.extraMaterial.description} ({course.extraMaterial.price > 0 ? `$${course.extraMaterial.price} USD` : "Included"})
          </>
        )}
        <br />
        <strong style={{ color: "var(--theme-primary)" }}>Available:</strong> {course.available ? "Yes" : `From ${course.availableDate}`}
        <br />
        <strong style={{ color: "var(--theme-primary)" }}>Payment:</strong> {course.paymentInstructions}
      </div>

      <h3 style={{ color: "var(--theme-primary)", marginBottom: "1em" }}>Course Curriculum</h3>
      <LessonList>
        {!course.lessons || course.lessons.length === 0 ? (
          <li>No lessons available yet.</li>
        ) : (
          course.lessons.map(lesson => (
            <LessonItem key={lesson.id}>
              <span style={{ fontWeight: 500, display: "flex", alignItems: "center" }}>
                {lesson.name}
                {lesson.resources?.some(r => r.locked) && <span title="Some resources are locked"><LockIcon /></span>}
              </span>
              <Button style={{ padding: "0.5em 1em", fontSize: "0.9em" }} onClick={() => onLessonClick(lesson)}>
                View Resources
              </Button>
            </LessonItem>
          ))
        )}
      </LessonList>
    </Section>
  );
}
