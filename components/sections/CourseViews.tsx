"use client";
import type { Course, CourseSession, Lesson } from "@/components/cms/types";
import { Button, CourseCard, Section } from "@/components/ui/Styled";
import styled from "styled-components";

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
  &:last-child {
    border-bottom: none;
  }
`;

const SessionBadge = styled.span`
  display: inline-block;
  background: ${(p) => p.theme.colors.accent}22;
  color: ${(p) => p.theme.colors.primary};
  padding: 0.3em 0.8em;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  border: 1px solid ${(p) => p.theme.colors.accent}44;
`;

const StatusBadge = styled.span<{ active?: boolean }>`
  display: inline-block;
  padding: 0.2em 0.6em;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(p) => (p.active ? "#e6f4ea" : "#fef7e0")};
  color: ${(p) => (p.active ? "#1e7e34" : "#b05d22")};
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5em;
  margin: 1.5em 0;
  padding: 1.5em;
  background: ${(p) => p.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  label {
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${(p) => p.theme.colors.textSecondary};
    font-weight: 700;
  }

  span,
  ul {
    font-size: 1rem;
    color: ${(p) => p.theme.colors.text};
    font-weight: 500;
  }
`;

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

function formatSessionRange(session: CourseSession) {
  const start = new Date(session.startDate + "T00:00:00");
  const end = new Date(session.endDate + "T00:00:00");

  const startMonth = start.toLocaleString("en-US", { month: "long" });
  const endMonth = end.toLocaleString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} - ${endDay}${getOrdinalSuffix(endDay)}, ${startYear}`;
    }
    return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} - ${endMonth} ${endDay}${getOrdinalSuffix(endDay)}, ${startYear}`;
  }
  return `${formatDate(session.startDate)} - ${formatDate(session.endDate)}`;
}

export function CourseList({
  courses,
  onSelect,
}: {
  courses: Course[];
  onSelect: (id: string) => void;
}) {
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
      <h2 style={{ marginBottom: "1em", color: "var(--theme-foreground)" }}>
        Training Courses
      </h2>
      {courses.map((course) => {
        const hasSessions = course.sessions && course.sessions.length > 0;
        const isComingSoon = !course.available || !hasSessions;

        return (
          <CourseCard key={course.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  color: "var(--theme-primary)",
                  flex: 1,
                }}
              >
                {course.name}
              </h3>
              <StatusBadge active={!isComingSoon}>
                {isComingSoon ? "Coming Soon" : "Enrollment Open"}
              </StatusBadge>
            </div>

            <p
              style={{
                margin: "0.5em 0",
                lineHeight: 1.5,
                color: "var(--theme-text)",
              }}
            >
              {course.description}
            </p>

            {hasSessions && (
              <div style={{ margin: "0.5em 0" }}>
                <SessionBadge>
                  Next Session: {formatSessionRange(course.sessions![0])}
                </SessionBadge>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "2em",
                color: "var(--theme-text-secondary)",
                fontSize: "0.9em",
                marginTop: "0.5em",
                borderTop: "1px solid var(--theme-border)",
                paddingTop: "1em",
              }}
            >
              <div>
                <strong
                  style={{
                    color: "var(--theme-primary)",
                    display: "block",
                    fontSize: "0.75em",
                    textTransform: "uppercase",
                  }}
                >
                  Schedule
                </strong>
                {course.schedule}
              </div>
              <div>
                <strong
                  style={{
                    color: "var(--theme-primary)",
                    display: "block",
                    fontSize: "0.75em",
                    textTransform: "uppercase",
                  }}
                >
                  Price
                </strong>
                {course.price > 0
                  ? `$${course.price.toLocaleString()} USD`
                  : "TBD"}
              </div>
            </div>

            <div style={{ marginTop: "1em" }}>
              <Button onClick={() => onSelect(course.id)}>
                View Course Details
              </Button>
            </div>
          </CourseCard>
        );
      })}
    </Section>
  );
}

export function CourseDetail({
  course,
  onBack,
  onRegister,
  onLessonClick,
}: {
  course: Course;
  onBack: () => void;
  onRegister: (courseId: string) => void;
  onLessonClick: (lesson: Lesson) => void;
}) {
  const hasSessions = course.sessions && course.sessions.length > 0;
  const isComingSoon = !course.available || !hasSessions;

  return (
    <Section>
      <button
        style={{
          background: "none",
          border: "none",
          color: "var(--theme-text-secondary)",
          cursor: "pointer",
          marginBottom: "1.5em",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          padding: 0,
          fontSize: "0.95rem",
        }}
        onClick={onBack}
      >
        <span>←</span> Back to Courses
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1em",
          marginBottom: "1.5em",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "var(--theme-primary)",
            fontSize: "1.8rem",
          }}
        >
          {course.name}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <StatusBadge active={!isComingSoon}>
            {isComingSoon ? "Coming Soon" : "Enrollment Open"}
          </StatusBadge>
          <Button onClick={() => onRegister(course.id)} disabled={isComingSoon}>
            {isComingSoon ? "Coming Soon" : "Enroll Now"}
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: "2em" }}>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "var(--theme-text)",
            marginBottom: "1em",
          }}
        >
          {course.description}
        </p>
        {hasSessions && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
            <strong style={{ color: "var(--theme-primary)" }}>
              Upcoming Session:
            </strong>
            <SessionBadge style={{ fontSize: "1rem" }}>
              {formatSessionRange(course.sessions![0])}
            </SessionBadge>
          </div>
        )}
      </div>

      <MetaGrid>
        <MetaItem>
          <label>Schedule</label>
          <span>{course.schedule}</span>
        </MetaItem>
        <MetaItem>
          <label>Price</label>
          <span>
            {course.price > 0 ? `$${course.price.toLocaleString()} USD` : "TBD"}
          </span>
        </MetaItem>
        {course.extraMaterial && (
          <MetaItem>
            <label>Extra Material</label>
            <span>
              {course.extraMaterial.description} (
              {course.extraMaterial.price > 0
                ? `$${course.extraMaterial.price} USD`
                : "Included"}
              )
            </span>
          </MetaItem>
        )}
        <MetaItem>
          <label>Available Dates</label>
          {isComingSoon ? (
            <span>Coming Soon</span>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {course.sessions?.map((s, i) => (
                <li key={i} style={{ marginBottom: "0.2em" }}>
                  {s.label && (
                    <strong style={{ fontSize: "0.9em" }}>{s.label}: </strong>
                  )}
                  {formatSessionRange(s)}
                </li>
              ))}
            </ul>
          )}
        </MetaItem>
        <MetaItem style={{ gridColumn: "1 / -1" }}>
          <label>Payment Instructions</label>
          <span
            style={{ fontSize: "0.95em", color: "var(--theme-text-secondary)" }}
          >
            {course.paymentInstructions}
          </span>
        </MetaItem>
      </MetaGrid>

      <h3
        style={{
          color: "var(--theme-primary)",
          marginBottom: "1.2em",
          borderBottom: "2px solid var(--theme-accent)",
          display: "inline-block",
          paddingBottom: "0.2em",
        }}
      >
        What You'll Learn
      </h3>
      <LessonList>
        {!course.lessons || course.lessons.length === 0 ? (
          <li style={{ color: "var(--theme-text-secondary)" }}>
            Detailed lesson plan coming soon.
          </li>
        ) : (
          course.lessons.map((lesson) => (
            <LessonItem key={lesson.id}>
              <div
                style={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  color: "var(--theme-text)",
                }}
              >
                {lesson.name}
              </div>
            </LessonItem>
          ))
        )}
      </LessonList>
    </Section>
  );
}
