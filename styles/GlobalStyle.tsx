"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    background: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};
    margin: 0;
    padding: 0;
    font-family: ${(p) => p.theme.typography.fontFamily};
    font-size: ${(p) => p.theme.typography.fontSize}px;
    line-height: ${(p) => p.theme.typography.lineHeight};
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * { box-sizing: border-box; }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(p) => p.theme.typography.headingFont};
    font-weight: ${(p) => p.theme.typography.headingFontWeight};
    line-height: ${(p) => p.theme.typography.headingLineHeight};
    margin: 0 0 ${(p) => p.theme.spacing.md}px 0;
    color: ${(p) => p.theme.colors.text};
  }

  h1 { font-size: ${(p) => p.theme.typography.h1Size}px; }
  h2 { font-size: ${(p) => p.theme.typography.h2Size}px; }
  h3 { font-size: ${(p) => p.theme.typography.h3Size}px; }
  h4 { font-size: ${(p) => p.theme.typography.h4Size}px; }
  h5 { font-size: ${(p) => p.theme.typography.h5Size}px; }
  h6 { font-size: ${(p) => p.theme.typography.h6Size}px; }

  p {
    margin: 0 0 ${(p) => p.theme.spacing.md}px 0;
    line-height: ${(p) => p.theme.typography.lineHeight};
  }

  a {
    color: ${(p) => p.theme.colors.accent};
    text-decoration: none;
    transition: ${(p) => p.theme.transitions.fast};

    &:hover {
      color: ${(p) => p.theme.colors.accentHover};
      text-decoration: underline;
    }
  }

  :focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.accent};
    outline-offset: 2px;
  }

  button {
    font-family: ${(p) => p.theme.typography.fontFamily};
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
