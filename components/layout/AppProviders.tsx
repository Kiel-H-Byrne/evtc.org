"use client";

import { tokens } from "@/lib/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

