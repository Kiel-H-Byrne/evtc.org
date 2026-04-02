"use client";
import { Section } from "@/components/ui/Styled";
import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <Section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)", // Adjust based on header/footer height
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Image
        src="/img/EVTC Website.png"
        alt="Elite VTC Coming Soon"
        width={800}
        height={400}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "16px",
          marginBottom: "40px",
        }}
      />
      <h1
        style={{
          fontSize: "clamp(24px, 5vw, 42px)",
          color: "var(--primary)",
          marginBottom: "20px",
        }}
      >
        Our new website is launching soon!
      </h1>
      <p
        style={{
          fontSize: "clamp(16px, 4vw, 18px)",
          color: "var(--textSecondary)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        We are working hard to bring you an amazing online experience. Stay
        tuned for updates!
      </p>
    </Section>
  );
}
