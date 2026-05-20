"use client";

import type { AboutContent } from "@/components/cms/types";
import { useCms } from "@/components/cms/useCms";
import { AboutSection } from "@/components/sections/InfoSections";
import dbFallback from "@/lib/fallbackDb.json";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { getAboutContent } = useCms();
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedAbout = await getAboutContent();
      if (!fetchedAbout) {
        setAbout(dbFallback.about as AboutContent);
      } else {
        setAbout(fetchedAbout);
      }
      setLoading(false);
    }
    fetchData();
  }, [getAboutContent]);

  if (loading) return <p>Loading about information...</p>;

  return <AboutSection content={about} />;
}
