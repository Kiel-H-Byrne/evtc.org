"use client";

import styled, { css } from "styled-components";

const inputBase = css`
  padding: ${(p) => p.theme.spacing.md}px;
  border-radius: ${(p) => p.theme.radii.medium}px;
  border: 1px solid ${(p) => p.theme.colors.border};
  font-size: ${(p) => p.theme.typography.body1}px;
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  font-family: ${(p) => p.theme.typography.fontFamily};
  transition: ${(p) => p.theme.transitions.fast};
  width: 100%;

  &::placeholder {
    color: ${(p) => p.theme.colors.textTertiary};
  }

  &:hover {
    border-color: ${(p) => p.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.accent};
    outline: none;
    box-shadow: 0 0 0 3px ${(p) => p.theme.colors.accentLight};
  }
`;

export const Input = styled.input.attrs({ "data-component": "Input" } as any)`
  ${inputBase}
`;

export const TextArea = styled.textarea.attrs({
  "data-component": "TextArea",
} as any)`
  ${inputBase}
  min-height: 100px;
  resize: vertical;
  line-height: 1.5;
`;

export const Form = styled.form.attrs({ "data-component": "Form" } as any)`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.md}px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xs}px;
`;

export const Label = styled.label`
  font-size: ${(p) => p.theme.typography.body2}px;
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  color: ${(p) => p.theme.colors.text};
`;
