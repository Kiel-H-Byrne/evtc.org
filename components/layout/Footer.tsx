"use client";

import styled from "styled-components";
import React from "react";
import { useCms } from "@/components/cms/useCms";
import type { ContactContent } from "@/components/cms/types";

const FooterContainer = styled.footer`
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.surface};
  padding: 4em 1em 2em;
  margin-top: auto;
  font-family: ${(p) => p.theme.typography.fontFamily};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3em;
  margin-bottom: 3em;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const FooterLogo = styled.h2`
  font-family: ${(p) => p.theme.typography.headingFont};
  color: ${(p) => p.theme.colors.accent};
  font-size: 1.5rem;
  margin: 0;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5em;
  color: ${(p) => p.theme.colors.surface};
  border-bottom: 2px solid ${(p) => p.theme.colors.accent};
  padding-bottom: 0.5em;
  display: inline-block;
`;

const FooterLink = styled.a`
  color: ${(p) => p.theme.colors.surface};
  text-decoration: none;
  opacity: 0.8;
  transition: ${(p) => p.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: ${(p) => p.theme.colors.accent};
    text-decoration: underline;
  }
`;

const CopyrightArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5em;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
`;

export function Footer() {
  const { getContactContent } = useCms();
  const [contact, setContact] = React.useState<ContactContent | null>(null);

  React.useEffect(() => {
    getContactContent().then((res) => setContact(res));
  }, [getContactContent]);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>EVTC</FooterLogo>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            Elite Vocational Training Center is dedicated to training students in home improvement and refinishing to professional, industry-leading standards.
          </p>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Training & Academics</FooterHeading>
          <FooterLink>Bathtub & Vanity Refinishing</FooterLink>
          <FooterLink>Countertop & Cabinet Refinishing</FooterLink>
          <FooterLink>Drywall Installation</FooterLink>
          <FooterLink>Maintenance & Repair</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Contact Us</FooterHeading>
          <p style={{ opacity: 0.8, margin: 0 }}>
            {contact?.email ? (
              <a href={`mailto:${contact.email}`} style={{ color: "var(--theme-accent)" }}>{contact.email}</a>
            ) : (
              <a href="mailto:elitehigherlearning@gmail.com" style={{ color: "var(--theme-accent)" }}>elitehigherlearning@gmail.com</a>
            )}
          </p>
          {(contact?.phone) && (
            <p style={{ opacity: 0.8, margin: 0 }}>{contact.phone}</p>
          )}
          <p style={{ opacity: 0.8, margin: 0 }}>
            {contact?.address || "Central Pennsylvania Area"}
          </p>
        </FooterColumn>
      </FooterContent>

      <CopyrightArea>
        &copy; {new Date().getFullYear()} Elite Vocational Training Center. All rights reserved.
      </CopyrightArea>
    </FooterContainer>
  );
}
