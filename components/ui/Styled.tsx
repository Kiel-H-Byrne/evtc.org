"use client";
import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${(p) => p.theme.colors.background};
`;

export const Header = styled.header`
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.surface};
  padding: 1.5em 0 0.5em 0;
  text-align: center;
  box-shadow: ${(p) => p.theme.shadows.md};
`;

export const Main = styled.main`
  max-width: 900px;
  margin: 2em auto;
  padding: 0 1em;
  animation: fadein 0.3s ease-in;
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Section = styled.section`
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.large}px;
  box-shadow: ${(p) => p.theme.cardShadow};
  padding: ${(p) => p.theme.spacing.lg}px;
  margin-bottom: 2em;
`;

export const CourseCard = styled.div`
  background: ${(p) => p.theme.colors.surface};
  border-radius: ${(p) => p.theme.radii.large}px;
  box-shadow: ${(p) => p.theme.shadows.sm};
  border: 1px solid ${(p) => p.theme.colors.border};
  padding: 1.5em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: ${(p) => p.theme.transitions.default};
  &:hover {
    box-shadow: ${(p) => p.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const Button = styled.button`
  font-family: ${(p) => p.theme.typography.fontFamily};
  font-weight: ${(p) => p.theme.typography.headingFontWeight};
  border: none;
  border-radius: ${(p) => p.theme.radii.medium}px;
  padding: 0.75em 1.5em;
  background: ${(p) => p.theme.colors.accent};
  color: ${(p) => p.theme.colors.primary};
  cursor: pointer;
  transition: ${(p) => p.theme.transitions.default};
  font-size: 1rem;
  &:hover,
  &:focus {
    background: ${(p) => p.theme.colors.accentHover};
    box-shadow: ${(p) => p.theme.shadows.sm};
    outline: none;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonOutline = styled(Button)`
  background: transparent;
  border: 2px solid ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primary};
  &:hover,
  &:focus {
    background: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.surface};
  }
`;

export const Input = styled.input`
  font-family: ${(p) => p.theme.typography.fontFamily};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.small}px;
  padding: 0.75em 1em;
  font-size: 1rem;
  margin-bottom: 1em;
  transition: ${(p) => p.theme.transitions.default};
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accentHover}33;
  }
`;

export const Select = styled.select`
  font-family: ${(p) => p.theme.typography.fontFamily};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.small}px;
  padding: 0.75em 1em;
  font-size: 1rem;
  margin-bottom: 1em;
  transition: ${(p) => p.theme.transitions.default};
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accentHover}33;
  }
`;

export const Textarea = styled.textarea`
  font-family: ${(p) => p.theme.typography.fontFamily};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.small}px;
  padding: 0.75em 1em;
  font-size: 1rem;
  margin-bottom: 1em;
  min-height: 80px;
  resize: vertical;
  line-height: 1.5;
  transition: ${(p) => p.theme.transitions.default};
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accentHover}33;
  }
`;
