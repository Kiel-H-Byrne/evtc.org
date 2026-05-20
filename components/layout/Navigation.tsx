"use client";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  a {
    color: ${(p) => p.theme.colors.surface};
    text-decoration: none;
    font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5em 1em;
    border-bottom: 3px solid ${(p) => (p.active ? p.theme.colors.accent : "transparent")};
    transition: ${(p) => p.theme.transitions.fast};
    display: block;
    
    &:hover {
      color: ${(p) => p.theme.colors.accent};
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{ active?: boolean }>`
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
  border-bottom: 3px solid ${(p) => (p.active ? p.theme.colors.accent : "transparent")};
  
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
  a {
    display: block;
    padding: 0.75em 1.5em;
    cursor: pointer;
    font-weight: ${(p) => (p.active ? 600 : 400)};
    background: ${(p) => (p.active ? p.theme.colors.surfaceAlt : "transparent")};
    border-left: 3px solid ${(p) => (p.active ? p.theme.colors.accent : "transparent")};
    transition: ${(p) => p.theme.transitions.fast};
    text-decoration: none;
    color: inherit;
    
    &:hover {
      background: ${(p) => p.theme.colors.accentHover}1A;
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

export type NavigationProps = {
  courses: { id: string; name: string }[];
};

export function NavigationBar({ courses }: NavigationProps) {
  const [courseDropdown, setCourseDropdown] = useState(false);
  const pathname = usePathname();

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
    { key: "about", label: "About Us", href: "/" },
    { key: "courses", label: "Training Courses", href: "/courses" },
    { key: "contact", label: "Contact & Enrollment", href: "/contact" }
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
                active={pathname.startsWith("/courses")}
              >
                {tabItem.label} ▾
              </DropdownButton>
              <DropdownMenu open={courseDropdown} role="listbox">
                {courses.length > 0 ? courses.map((c) => (
                  <DropdownItem
                    key={c.id}
                    active={pathname === `/courses/${c.slug || c.id}`}
                  >
                    <Link href={`/courses/${c.slug || c.id}`} onClick={() => setCourseDropdown(false)}>
                      {c.name}
                    </Link>
                  </DropdownItem>
                )) : (
                  <li style={{ padding: '0.75em 1.5em', opacity: 0.7 }}>
                    Loading courses...
                  </li>
                )}
                {courses.length > 0 && (
                  <DropdownItem 
                    style={{ borderTop: "1px solid #E0E0E0", marginTop: "4px" }}
                  >
                    <Link href="/courses" style={{ fontSize: "0.9em", color: "#6E6E6E" }} onClick={() => setCourseDropdown(false)}>
                      View All Courses
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <TabItem
              key={tabItem.key}
              active={pathname === tabItem.href}
            >
              <Link href={tabItem.href}>
                {tabItem.label}
              </Link>
            </TabItem>
          )
        )}
      </Tabs>
    </NavBarWrapper>
  );
}
