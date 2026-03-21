"use client";

import styled from "styled-components";

const ComingSoonBlock = styled.div`
  position: relative;
  background: ${(p) => p.theme.colors.surfaceAlt};
  border: 1.5px dashed ${(p) => p.theme.colors.accent};
  border-radius: ${(p) => p.theme.radii.large}px;
  padding: ${(p) => p.theme.spacing.lg}px;
  margin: ${(p) => p.theme.spacing.lg}px 0;
  text-align: center;
  color: ${(p) => p.theme.colors.text};
  font-family: "Merriweather", serif;
  font-size: ${(p) => p.theme.typography.h6Size}px;
  box-shadow: ${(p) => p.theme.cardShadow};
  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }
  &.icon {
    height: 72px;
    width: 72px;
    display: flex;
    background: rgba(0, 0, 0, 0.45);
    border-radius: ${(p) => p.theme.radii.full}px;
  }
`;

const ComingSoonOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: ${(p) => p.theme.glassBlur};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.spacing.lg}px;
  text-align: center;
  z-index: 5;
  animation: fadeIn 0.35s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OverlayHeading = styled.h1`
  margin: 0 0 ${(p) => p.theme.spacing.sm}px 0;
  padding: 0;
  font-size: ${(p) => p.theme.typography.h1Size}px;
  font-weight: ${(p) => p.theme.typography.headingFontWeight};
  color: black;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
`;

const OverlayTitle = styled.h2`
  margin: 0 0 ${(p) => p.theme.spacing.sm}px 0;
  padding: 0;
  font-size: ${(p) => p.theme.typography.h2Size}px;
  font-weight: ${(p) => p.theme.typography.headingFontWeight};
  color: ${(p) => p.theme.colors.info};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const OverlayMessage = styled.div`
  font-size: ${(p) => p.theme.typography.body2}px;
  color: ${(p) => p.theme.colors.surface};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  max-width: 80%;
  line-height: 1.5;
`;

const IconWrapper = styled.div<{ onlyIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(p) => (p.onlyIcon ? 0 : p.theme.spacing.md)}px;

  svg {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`;

type ComingSoonProps = {
  title?: string;
  titleComponent?: React.ReactNode;
  message?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function ComingSoon({
  title,
  titleComponent,
  message,
  icon,
  children,
}: ComingSoonProps) {
  const hasTextContent = title || titleComponent || message;

  return (
    <>
      {icon && (
        <ComingSoonBlock className="disabled icon">
          <IconWrapper onlyIcon={!hasTextContent}>{icon}</IconWrapper>
        </ComingSoonBlock>
      )}
      {!icon && (
        <ComingSoonBlock className="disabled">
          <ComingSoonOverlay>
            <OverlayHeading>Launching Soon...</OverlayHeading>

            {/* {icon && hasTextContent && (
            <OverlayHeading>Launching Soon...</OverlayHeading>
          )} */}

            {titleComponent
              ? titleComponent
              : title && <OverlayTitle>{title}</OverlayTitle>}

            {message && <OverlayMessage>{message}</OverlayMessage>}
          </ComingSoonOverlay>

          {children}
        </ComingSoonBlock>
      )}
    </>
  );
}
