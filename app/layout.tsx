import { AppProviders } from "@/components/layout/AppProviders";
import { tokens } from "@/lib/theme";
import type { Metadata } from "next";
import { Roboto_Slab, Open_Sans } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Vocational Training Center",
  description:
    "EVTC is a private trade school dedicated to training students in home improvement and refinishing in Pennsylvania.",
  keywords: [
    "vocational training",
    "EVTC",
    "trade school",
    "bathtub refinishing",
    "countertop repair",
    "home improvement",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${openSans.variable}`}>
        <style>{`
          :root {
            --font-heading: ${robotoSlab.style.fontFamily};
            --font-body: ${openSans.style.fontFamily};
            --theme-background: ${tokens.colors.background};
            --theme-foreground: ${tokens.colors.text};
          }
        `}</style>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
