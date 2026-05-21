import { fetchCourses } from "@/components/cms/content";
import { AppProviders } from "@/components/layout/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { NavigationBar } from "@/components/layout/Navigation";
import { Header } from "@/components/ui/Styled";
import { tokens } from "@/lib/theme";
import type { Metadata } from "next";
import { Open_Sans, Roboto_Slab } from "next/font/google";
import Image from "next/image";
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
    "EVTC is a private trade school dedicated to training your team in home improvement and refinishing in Pennsylvania.",
  keywords: [
    "vocational training",
    "EVTC",
    "trade school",
    "bathtub refinishing",
    "countertop repair",
    "home improvement",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navCourses = await fetchCourses().catch(() => []);

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
        <AppProviders>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header>
              <div style={{ padding: "2em 1em" }}>
                <h1
                  style={{
                    marginBottom: "0.5em",
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.5rem",
                    color: "var(--theme-text-secondary)",
                    display: "none",
                  }}
                >
                  Elite Vocational Training Center
                </h1>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    margin: "1em auto",
                  }}
                >
                  <Image
                    src="/img/EVTC Website.png"
                    alt="EVTC Website"
                    width={800}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "12px",
                    }}
                    priority
                  />
                </div>
              </div>
            </Header>

            <NavigationBar courses={navCourses} />

            <main
              style={{
                flex: 1,
                width: "100%",
                maxWidth: "900px",
                margin: "2em auto",
                padding: "0 1em",
              }}
            >
              {children}
            </main>

            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
