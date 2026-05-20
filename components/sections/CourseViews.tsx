"use client";
import type { Course, Lesson, MediaItem } from "@/components/cms/types";
import { Button, CourseCard, Section } from "@/components/ui/Styled";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React, { useState } from "react";
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

const MediaContainer = styled.div`
  width: 100%;
  margin-bottom: 2em;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  position: relative;
`;

const Carousel = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  position: relative;
  img,
  iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
  }
`;

const CarouselNav = styled.div`
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5em;
`;

const NavDot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(p) =>
    p.active ? p.theme.colors.accent : "rgba(255,255,255,0.5)"};
  cursor: pointer;
  padding: 0;
`;

function MediaViewer({ items }: { items: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  return (
    <MediaContainer>
      <Carousel
        ref={carouselRef}
        onScroll={(e) => {
          const target = e.currentTarget;
          const index = Math.round(target.scrollLeft / target.offsetWidth);
          if (index !== activeIndex) setActiveIndex(index);
        }}
      >
        {items.map((item, i) => (
          <CarouselItem key={i}>
            {item._type === "image" ? (
              <img
                src={urlFor(item.asset).url()}
                alt={item.caption || "Course media"}
              />
            ) : (
              <iframe
                src={item.url}
                title={item.caption || "Course video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </CarouselItem>
        ))}
      </Carousel>
      {items.length > 1 && (
        <CarouselNav>
          {items.map((_, i) => (
            <NavDot
              key={i}
              active={i === activeIndex}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: carouselRef.current.offsetWidth * i,
                    behavior: "smooth",
                  });
                }
              }}
            />
          ))}
        </CarouselNav>
      )}
    </MediaContainer>
  );
}

export function CourseList({ courses }: { courses: Course[] }) {
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
        const isComingSoon = !course.available;

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
              <Link
                href={`/courses/${course.slug || course.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button as="div">View Course Details</Button>
              </Link>
            </div>
          </CourseCard>
        );
      })}
    </Section>
  );
}

export function CourseDetail({
  course,
  onLessonClick,
}: {
  course: Course;
  onLessonClick: (lesson: Lesson) => void;
}) {
  const isComingSoon = !course.available;

  return (
    <Section>
      <Link
        href="/courses"
        style={{
          color: "var(--theme-text-secondary)",
          marginBottom: "1.5em",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        <span>←</span> Back to Courses
      </Link>

      {course.media && course.media.length > 0 && (
        <MediaViewer items={course.media} />
      )}

      {course.media && course.media.length > 0 && (
        <MediaViewer items={course.media} />
      )}

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
          <Link
            href={
              isComingSoon
                ? "#"
                : `/contact?courseId=${course.slug || course.id}`
            }
            style={{ textDecoration: "none" }}
          >
            <Button as="div" disabled={isComingSoon}>
              {isComingSoon ? "Coming Soon" : "Enroll Now"}
            </Button>
          </Link>
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
      </div>

      <MetaGrid>
        <MetaItem>
          <label>Schedule</label>
          <span>{course.schedule}</span>
        </MetaItem>
        {/* <MetaItem>
          <label>Price</label>
          <span>
            {course.price > 0 ? `$${course.price.toLocaleString()} USD` : "TBD"}
          </span>
        </MetaItem> */}
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
        {/* <MetaItem style={{ gridColumn: "1 / -1" }}>
          <label>Payment Instructions</label>
          <span
            style={{ fontSize: "0.95em", color: "var(--theme-text-secondary)" }}
          >
            {course.paymentInstructions ||
              "Contact us for business payment options."}
          </span>
        </MetaItem> */}
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
            <LessonItem
              key={lesson.id}
              onClick={() => onLessonClick(lesson)}
              style={{ cursor: "pointer" }}
            >
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
