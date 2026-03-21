"use client";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const NavBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.primaryHover};
  padding: 0.5em 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

const Tabs = styled.ul`
  display: flex;
  gap: 2em;
  margin: 0;
  padding: 0;
  list-style: none;
  
  @media (max-width: 600px) {
    gap: 1em;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TabItem = styled.li<{ active?: boolean }>`
  color: ${(p) => p.theme.colors.surface};
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5em 1em;
  border-bottom: 3px solid ${(p) => (p.active ? p.theme.colors.accent : "transparent")};
  transition: ${(p) => p.theme.transitions.fast};
  
  &:hover {
    color: ${(p) => p.theme.colors.accent};
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  color: ${(p) => p.theme.colors.surface};
  font-family: ${(p) => p.theme.typography.fontFamily};
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  font-size: 1.1rem;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: ${(p) => p.theme.transitions.fast};
  
  &:hover, &:focus {
    color: ${(p) => p.theme.colors.accent};
    outline: none;
  }
`;

const DropdownMenu = styled.ul<{ open: boolean }>`
  display: ${(p) => (p.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  box-shadow: ${(p) => p.theme.shadows.lg};
  border-radius: ${(p) => p.theme.radii.medium}px;
  margin: 0.5em 0 0 0;
  padding: 0.5em 0;
  z-index: 20;
  list-style: none;
  border: 1px solid ${(p) => p.theme.colors.border};
  animation: ${(p) =>
    p.open
      ? css`
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        `
      : "none"} 0.2s ease-out;
`;

const DropdownItem = styled.li<{ active?: boolean }>`
  padding: 0.75em 1.5em;
  cursor: pointer;
  font-weight: ${(p) => (p.active ? 600 : 400)};
  background: ${(p) => (p.active ? p.theme.colors.surfaceAlt : "transparent")};
  border-left: 3px solid ${(p) => (p.active ? p.theme.colors.accent : "transparent")};
  transition: ${(p) => p.theme.transitions.fast};
  
  &:hover {
    background: ${(p) => p.theme.colors.accentHover}1A;
    color: ${(p) => p.theme.colors.primary};
  }
`;

export type NavigationProps = {
  currentTab: string;
  onTabChange: (tab: string) => void;
  courses: { id: string; name: string }[];
  selectedCourseId: string | null;
  onCourseSelect: (id: string) => void;
};

export function NavigationBar({ currentTab, onTabChange, courses, selectedCourseId, onCourseSelect }: NavigationProps) {
  const [courseDropdown, setCourseDropdown] = useState(false);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest('[data-component="Dropdown"]') == null) {
        setCourseDropdown(false);
      }
    }
    if (courseDropdown) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [courseDropdown]);

  const tabs = [
    { key: "about", label: "About Us" },
    { key: "courses", label: "Training Courses" },
    { key: "contact", label: "Contact Us" },
    { key: "registration", label: "Registration" }
  ];

  return (
    <NavBarWrapper>
      <Tabs>
        {tabs.map((tabItem) => 
          tabItem.key === "courses" ? (
            <Dropdown data-component="Dropdown" key={tabItem.key}>
              <DropdownButton
                aria-haspopup="listbox"
                aria-expanded={courseDropdown}
                onClick={() => setCourseDropdown((open) => !open)}
              >
                {tabItem.label} ▾
              </DropdownButton>
              <DropdownMenu open={courseDropdown} role="listbox">
                {courses.length > 0 ? courses.map((c) => (
                  <DropdownItem
                    key={c.id}
                    active={selectedCourseId === c.id}
                    onClick={() => {
                      onCourseSelect(c.id);
                      setCourseDropdown(false);
                    }}
                  >
                    {c.name}
                  </DropdownItem>
                )) : (
                  <DropdownItem style={{ opacity: 0.7, cursor: "default" }}>
                    Loading courses...
                  </DropdownItem>
                )}
                {courses.length > 0 && (
                  <DropdownItem 
                    style={{ borderTop: "1px solid #E0E0E0", marginTop: "4px", fontSize: "0.9em", color: "#6E6E6E" }}
                    onClick={() => {
                      onTabChange("courses");
                      setCourseDropdown(false);
                    }}
                  >
                    View All Courses
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <TabItem
              key={tabItem.key}
              active={currentTab === tabItem.key && !selectedCourseId}
              onClick={() => onTabChange(tabItem.key)}
            >
              {tabItem.label}
            </TabItem>
          )
        )}
      </Tabs>
    </NavBarWrapper>
  );
}
