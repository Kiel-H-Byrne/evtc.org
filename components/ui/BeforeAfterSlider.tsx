"use client";
import React, { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BeforeImage = styled(ImageWrapper)`
  z-index: 1;
`;

const AfterImage = styled(ImageWrapper)<{ percent: number }>`
  z-index: 2;
  clip-path: inset(0 0 0 ${p => p.percent}%);
`;

const SliderInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: ew-resize;
  z-index: 10;
`;

const SliderHandle = styled.div<{ percent: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${p => p.percent}%;
  width: 2px;
  background: white;
  z-index: 5;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    border: 2px solid rgba(0,0,0,0.1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m15 18-6-6 6-6'/%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
  }
`;

const Label = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  bottom: 1em;
  ${p => p.position === 'left' ? 'left: 1em;' : 'right: 1em;'}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.2em 0.6em;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 4;
  pointer-events: none;
`;

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeUrl, afterUrl }) => {
  const [percent, setPercent] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercent(Number(e.target.value));
  };

  return (
    <SliderContainer>
      <BeforeImage>
        <img src={beforeUrl} alt="Before" />
        <Label position="left">Before</Label>
      </BeforeImage>
      <AfterImage percent={percent}>
        <img src={afterUrl} alt="After" />
        <Label position="right">After</Label>
      </AfterImage>
      <SliderHandle percent={percent} />
      <SliderInput 
        type="range" 
        min="0" 
        max="100" 
        value={percent} 
        onChange={handleChange} 
      />
    </SliderContainer>
  );
};
