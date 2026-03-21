"use client";

import styled, { css } from "styled-components";

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.sm}px;
  border: none;
  border-radius: ${(p) => p.theme.radii.medium}px;
  padding: ${(p) => p.theme.spacing.md}px ${(p) => p.theme.spacing.lg}px;
  font-size: ${(p) => p.theme.typography.body1}px;
  font-family: ${(p) => p.theme.typography.fontFamily};
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  cursor: pointer;
  transition: ${(p) => p.theme.transitions.default};
  text-decoration: none;
  outline: none;
`;

export const Button = styled.a.attrs({
  "data-component": "Button",
  tabIndex: 0,
  role: "button",
})`
  ${buttonBase}
  background: ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.surface};
  box-shadow: ${(p) => p.theme.shadows.sm};

  &:hover,
  &:focus-visible {
    background: ${(p) => p.theme.colors.accentHover};
    color: ${(p) => p.theme.colors.surface};
    transform: translateY(-2px);
    box-shadow: ${(p) => p.theme.shadows.md};
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${(p) => p.theme.shadows.sm};
  }
`;

export const ButtonOutline = styled.a.attrs({
  "data-component": "ButtonOutline",
  tabIndex: 0,
  role: "button",
})`
  ${buttonBase}
  background: transparent;
  color: ${(p) => p.theme.colors.accent};
  border: 2px solid ${(p) => p.theme.colors.accent};

  &:hover,
  &:focus-visible {
    background: ${(p) => p.theme.colors.accentLight};
    color: ${(p) => p.theme.colors.accent};
    text-decoration: none;
  }
`;

export const ButtonSubmit = styled.button.attrs({
  "data-component": "ButtonSubmit",
  type: "submit",
} as any)`
  ${buttonBase}
  background: ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.surface};
  box-shadow: ${(p) => p.theme.shadows.sm};
  width: 100%;
  margin-top: ${(p) => p.theme.spacing.md}px;

  &:hover,
  &:focus-visible {
    background: ${(p) => p.theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: ${(p) => p.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
