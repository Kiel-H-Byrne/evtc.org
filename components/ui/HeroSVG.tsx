import React from "react";

export const HeroSVG = () => (
  <svg
    width="320"
    height="120"
    viewBox="0 0 320 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-component="HeroSVG"
    aria-hidden="true"
    style={{ display: "block", margin: "0 auto" }}
  >
    <rect x="0" y="0" width="320" height="120" rx="20" fill="var(--theme-background)" />
    <rect x="20" y="40" width="60" height="40" rx="8" fill="#1F3A5F" />
    <rect x="100" y="40" width="60" height="40" rx="8" fill="#C9A227" />
    <rect x="180" y="40" width="60" height="40" rx="8" fill="#6E6E6E" />
    <circle cx="270" cy="60" r="20" fill="#C9A227" />
    <rect x="260" y="50" width="20" height="20" rx="4" fill="#F4F4F4" />
    <text x="30" y="70" fontFamily="var(--font-heading)" fontSize="18" fill="#FFF">
      EVTC
    </text>
  </svg>
);
