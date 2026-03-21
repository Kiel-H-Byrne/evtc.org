"use client";
import React from "react";
import styled from "styled-components";
import type { Lesson } from "@/components/cms/types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(31,58,95,0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadein 0.2s ease-out;
`;

const ModalContent = styled.div`
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.large}px;
  box-shadow: ${(p) => p.theme.shadows.modal};
  padding: 2.5em;
  max-width: 650px;
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: 1.5em;
  padding: 0.2em 0.5em;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  &:hover {
    background: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.primary};
  }
`;

const LockIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" data-component="LockIcon" aria-label="Locked">
        <rect x="4" y="7" width="8" height="5" rx="1.5" fill="#C9A227" stroke="#1F3A5F" />
        <path d="M8 7V5.5A2.5 2.5 0 0 1 13 5.5V7" stroke="#1F3A5F" strokeWidth="1.2" />
        <circle cx="8" cy="10" r="1" fill="#1F3A5F" />
    </svg>
);

function ResourceTypeIcon({ type }: { type: string }) {
  if (type === "pdf") return <span style={{fontSize: "1.2rem"}}>📄</span>;
  if (type === "slides") return <span style={{fontSize: "1.2rem"}}>🖼️</span>;
  if (type === "video") return <span style={{fontSize: "1.2rem"}}>🎥</span>;
  if (type === "link") return <span style={{fontSize: "1.2rem"}}>🔗</span>;
  return <span>❓</span>;
}

function ResourceViewer({ resource }: { resource: any }) {
    if (resource.type === "pdf" || resource.type === "slides") {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--theme-primary)", textDecoration: "underline" }}>
                {resource.name} (PDF/Slides)
            </a>
        );
    } else if (resource.type === "video") {
        return (
            <iframe
                title={resource.name}
                src={resource.url}
                width="100%"
                height="315"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none", borderRadius: "8px", margin: "0.5em 0" }}
            />
        );
    } else if (resource.type === "link") {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--theme-primary)", textDecoration: "underline" }}>
                {resource.name}
            </a>
        );
    } else {
        return <span>Unknown Resource Format</span>;
    }
}

export function LessonModal({ lesson, onClose }: { lesson: Lesson | null, onClose: () => void }) {
  if (!lesson) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">×</CloseButton>
        <h2 style={{ color: "var(--theme-primary)", marginBottom: "1.5em", paddingRight: "1.5em" }}>{lesson.name}</h2>
        
        <ul style={{ padding: 0, listStyle: "none" }}>
          {!lesson.resources || lesson.resources.length === 0 ? (
            <li style={{ color: "var(--theme-text-secondary)" }}>No resources attached to this lesson.</li>
          ) : (
            lesson.resources.map((resource) => (
              <li key={resource.id} style={{ marginBottom: "2em", padding: "1em", background: "var(--theme-background)", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "0.5em" }}>
                  <ResourceTypeIcon type={resource.type} />
                  <span style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--theme-primary)" }}>{resource.name}</span>
                  {resource.locked && (
                    <span title="Locked" style={{ marginLeft: "auto" }}><LockIcon /></span>
                  )}
                </div>
                <div style={{ marginLeft: "2em", marginTop: "1em" }}>
                  {resource.locked ? (
                    <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.95em", background: "#f9f9f9", padding: "1em", borderRadius: "6px", borderLeft: "3px solid var(--theme-accent)" }}>
                      This resource is locked. Please <strong style={{color: "var(--theme-primary)"}}>Enroll and Complete Payment</strong> to access the full curriculum.
                    </div>
                  ) : (
                    <ResourceViewer resource={resource} />
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </ModalContent>
    </ModalOverlay>
  );
}
