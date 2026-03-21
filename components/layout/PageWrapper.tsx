"use client";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import styled from "styled-components";

const AppContainer = styled.div.attrs({
  "data-component": "AppContainer",
} as any)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const MainContent = styled.main.attrs({
  "data-component": "MainContent",
} as any)`
  width: 100%;
  max-width: 1200px;
  padding: ${(p) => p.theme.spacing.lg}px;
  flex: 1;

  @media (max-width: 768px) {
    padding: ${(p) => p.theme.spacing.md}px;
  }
`;

type PageWrapperProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
};

export function PageWrapper({
  children,
  showBackButton = true,
}: PageWrapperProps) {
  return (
    <AppContainer>
      <Navigation />
      <MainContent>{children}</MainContent>
      <Footer />
    </AppContainer>
  );
}
