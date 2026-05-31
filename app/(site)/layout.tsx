import { fetchCourses } from "@/components/cms/content";
import { AppProviders } from "@/components/layout/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { NavigationBar } from "@/components/layout/Navigation";
import { Header } from "@/components/ui/Styled";
import Image from "next/image";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navCourses = await fetchCourses().catch(() => []);

  return (
    <AppProviders>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header style={{ padding: "0" }}>
          <div style={{ padding: "0 1em" }}>
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
  );
}
