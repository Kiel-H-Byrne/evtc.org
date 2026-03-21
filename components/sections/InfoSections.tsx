"use client";
import React from "react";
import { Section } from "@/components/ui/Styled";
import type { AboutContent, ContactContent } from "@/components/cms/types";

export function AboutSection({ content }: { content: AboutContent | null }) {
  if (!content) {
    return (
      <Section>
        <h2 style={{ color: "var(--theme-primary)", marginBottom: "1em" }}>Loading About...</h2>
      </Section>
    );
  }

  return (
    <Section>
      <h2 style={{ color: "var(--theme-primary)", marginBottom: "1em" }}>{content.heading}</h2>
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--theme-text-secondary)" }}>
        {content.body}
      </p>
    </Section>
  );
}

export function ContactSection({ content }: { content: ContactContent | null }) {
  if (!content) {
    return (
      <Section>
        <h2 style={{ color: "var(--theme-primary)", marginBottom: "1em" }}>Contact Us</h2>
        <p>Loading contact information...</p>
      </Section>
    );
  }

  return (
    <Section>
      <h2 style={{ color: "var(--theme-primary)", marginBottom: "1em" }}>Contact Us</h2>
      <div style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--theme-text-secondary)" }}>
        <p>
          <strong style={{ color: "var(--theme-text)" }}>Email:</strong>{" "}
          <a href={`mailto:${content.email}`} style={{ color: "var(--theme-primary)", textDecoration: "underline" }}>
            {content.email}
          </a>
        </p>
        {content.phone && (
          <p>
            <strong style={{ color: "var(--theme-text)" }}>Phone:</strong> {content.phone}
          </p>
        )}
        {content.address && (
          <p>
            <strong style={{ color: "var(--theme-text)" }}>Address:</strong> {content.address}
          </p>
        )}
      </div>
    </Section>
  );
}
