"use client";

import styled from "styled-components";

export const ContentSection = styled.section.attrs({
  "data-component": "ContentSection",
} as any)`
  width: 100%;
  max-width: 900px;
  margin: ${(p) => p.theme.spacing.lg}px auto;
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.large}px;
  box-shadow: ${(p) => p.theme.shadows.md};
  padding: ${(p) => p.theme.spacing.xl}px;

  @media (max-width: 768px) {
    padding: ${(p) => p.theme.spacing.lg}px;
    margin: ${(p) => p.theme.spacing.md}px auto;
  }
`;

export const SectionTitle = styled.h2.attrs({
  "data-component": "SectionTitle",
} as any)`
  font-size: ${(p) => p.theme.typography.h2Size}px;
  color: ${(p) => p.theme.colors.accent};
  font-family: ${(p) => p.theme.typography.headingFont};
  font-weight: ${(p) => p.theme.typography.headingFontWeight};
  margin: 0 0 ${(p) => p.theme.spacing.lg}px 0;
  position: relative;
  padding-bottom: ${(p) => p.theme.spacing.md}px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${(p) => p.theme.colors.accent};
    border-radius: 2px;
  }
`;

export const SectionText = styled.p.attrs({
  "data-component": "SectionText",
} as any)`
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: ${(p) => p.theme.typography.body1}px;
  font-family: ${(p) => p.theme.typography.fontFamily};
  line-height: ${(p) => p.theme.typography.lineHeight};
  margin-bottom: ${(p) => p.theme.spacing.md}px;
`;

export const ResourceTile = styled.a.attrs({
  "data-component": "ResourceTile",
  target: "_blank",
  rel: "noopener noreferrer",
})`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md}px;
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.medium}px;
  padding: ${(p) => p.theme.spacing.md}px ${(p) => p.theme.spacing.lg}px;
  margin-bottom: ${(p) => p.theme.spacing.sm}px;
  color: ${(p) => p.theme.colors.accent};
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  font-family: ${(p) => p.theme.typography.fontFamily};
  text-decoration: none;
  border: 1px solid ${(p) => p.theme.colors.border};
  transition: ${(p) => p.theme.transitions.default};
  box-shadow: ${(p) => p.theme.shadows.sm};

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &:hover,
  &:focus-visible {
    background: ${(p) => p.theme.colors.accentLight};
    border-color: ${(p) => p.theme.colors.accent};
    transform: translateX(4px);
    text-decoration: none;
  }
`;
