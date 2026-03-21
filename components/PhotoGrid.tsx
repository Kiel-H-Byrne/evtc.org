"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FloatingImage } from "@/types";

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PhotoCard = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radii.large}px;
  box-shadow: ${(p) => p.theme.cardShadow};
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Caption = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: ${(p) => p.theme.spacing.md}px;
  font-size: ${(p) => p.theme.typography.h6Size}px;
  font-weight: ${(p) => p.theme.typography.headingFontWeight};
  color: ${(p) => p.theme.colors.text};
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.92),
    rgba(255, 255, 255, 0.4) 70%,
    transparent
  );
  backdrop-filter: ${(p) => p.theme.glassBlur};
  opacity: 1;
  transform: translateY(0);
  transition: ${(p) => p.theme.transitions.default};

  ${PhotoCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  span {
    display: block;
    font-family: ${(p) => p.theme.typography.fontFamily};
  }
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

type Props = {
  images: FloatingImage[];
};

export const PhotoGrid: React.FC<Props> = ({ images }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <GridContainer>
        {images.map((img, i) => (
          <PhotoCard key={i} onClick={() => setLightboxImage(img.url)}>
            <img src={img.url} alt={img.title} />
            <Caption>
              <span>{img.title}</span>
            </Caption>
          </PhotoCard>
        ))}
      </GridContainer>
      {lightboxImage && (
        <Lightbox onClick={() => setLightboxImage(null)}>
          <LightboxImage src={lightboxImage} alt="Lightbox image" />
        </Lightbox>
      )}
    </>
  );
};

