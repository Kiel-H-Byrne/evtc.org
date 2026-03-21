"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import { SectionText } from "@/components/ui/Section";
import { Payment } from "@/types";

const PaymentSection = styled.div`
  background: transparent;
  border-radius: ${(p) => p.theme.radii.large}px;
  padding: 0;
`;

const PaymentButtonContainer = styled.div<{ view?: "compact" | "default" }>`
  display: flex;
  flex-direction: ${(p) => (p.view === "compact" ? "column" : "row")};
  margin-top: ${(p) => p.theme.spacing.md}px;
  border-radius: ${(p) => p.theme.radii.medium}px;
  overflow: hidden;
  width: fit-content;

  ${(p) =>
    p.view === "compact" &&
    css`
      gap: ${p.theme.spacing.sm}px;
    `}
`;

const PaymentIconButton = styled.button<{ view?: "compact" | "default" }>`
  background: ${(p) => p.theme.colors.surface};
  border: 1px solid ${(p) => p.theme.colors.border};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.sm}px;
  padding: ${(p) => p.theme.spacing.sm}px ${(p) => p.theme.spacing.md}px;
  transition: ${(p) => p.theme.transitions.default};

  .text-wrapper {
    display: grid;
    place-items: center;
  }
  .username-text,
  .service-text {
    grid-area: 1 / 1;
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
  }
  .username-text {
    opacity: 0;
  }
  &:hover .username-text {
    opacity: 1;
  }
  &:hover .service-text {
    opacity: 0;
  }

  &:not(:last-child) {
    border-right: ${(p) => (p.view === "compact" ? "1px solid" : "none")};
    border-bottom: ${(p) => (p.view === "compact" ? "none" : "1px solid")};
  }

  ${(p) =>
    p.view === "compact" &&
    css`
      border-radius: ${p.theme.radii.medium}px;
    `}

  &:hover {
    background: ${(p) => p.theme.colors.surfaceAlt};
  }
`;

const CopiedMessage = styled.div`
  color: ${(p) => p.theme.colors.success};
  font-size: ${(p) => p.theme.typography.subscript}px;
  margin-left: ${(p) => p.theme.spacing.md}px;
`;

type PaymentOptionsProps = {
  payment: Payment;
  view?: "compact" | "default";
};

export function PaymentOptions({
  payment,
  view = "default",
}: PaymentOptionsProps) {
  const [copied, setCopied] = useState<string | false>(false);

  return (
    <PaymentSection>
      {view === "default" && payment.closingWords && (
        <SectionText>{payment.closingWords}</SectionText>
      )}

      <SectionText>
        <b>${payment.amount.amount}</b> per {payment.amount.per}
      </SectionText>
      <PaymentButtonContainer view={view}>
        {payment.options.map((opt) => (
          <PaymentIconButton
            key={opt.service}
            view={view}
            onClick={() => {
              if (opt.url) {
                window.open(opt.url, "_blank");
              } else {
                navigator.clipboard.writeText(opt.username);
                setCopied(opt.username);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
          >
            {opt.icon}
            <div className="text-wrapper">
              <span className="service-text">{opt.service}</span>
              <span className="username-text">{opt.username}</span>
            </div>
          </PaymentIconButton>
        ))}
        {!!copied && (
          <CopiedMessage>{`Copied ${copied}! Login to Zelle and paste.`}</CopiedMessage>
        )}
      </PaymentButtonContainer>
      {view === "default" && (
        <SectionText>
          <i>{payment.note}</i>
        </SectionText>
      )}
    </PaymentSection>
  );
}

