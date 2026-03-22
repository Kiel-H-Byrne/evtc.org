"use client";

import { Header } from "@/components/ui/Styled";
import Image from "next/image";
import styled from "styled-components";
import { Footer } from "./Footer";
import { NavigationBar, type NavigationProps } from "./Navigation";

const AppContainer = styled.div.attrs({
  "data-component": "AppContainer",
} as any)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${(p) => p.theme.colors.background};
`;

const MainContent = styled.main.attrs({
  "data-component": "MainContent",
} as any)`
  width: 100%;
  max-width: 900px;
  margin: 2em auto;
  padding: 0 1em;
  flex: 1;
  animation: fadein 0.3s ease-in;
  @keyframes fadein {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: ${(p) => p.theme.spacing.md}px;
  }
`;

type PageWrapperProps = {
  children: React.ReactNode;
  navigationProps: NavigationProps;
};

export function PageWrapper({
  children,
  navigationProps,
}: PageWrapperProps) {
  return (
    <AppContainer>
      <Header>
        <h1 style={{ marginBottom: 0, fontFamily: "var(--font-heading)", fontSize: "2.2rem", color: "var(--theme-text-secondary)" }}>
          Elite Vocational Training Center
        </h1>
        <div style={{ margin: "1em 0" }}>
          {/* <HeroSVG /> */}
          <Image src="/img/EVTC Website.png" alt="EVTC Website" width={320} height={120} style={{ margin: "auto" }} />
        </div>
      </Header>

      <NavigationBar {...navigationProps} />

      <MainContent>{children}</MainContent>

      <Footer />
    </AppContainer>
  );
}
