// cms/useCms.ts
import { useCallback, useState } from "react";
import { fetchCourses, fetchAboutContent, fetchContactContent } from "./content";
import type { Course, AboutContent, ContactContent } from "./types";

export function useCms() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const run = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        return await fn();
      } catch (e) {
        setError(e);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getCourses = useCallback(
    () => run<Course[]>(() => fetchCourses()),
    [run]
  );

  const getAboutContent = useCallback(
    () => run<AboutContent | null>(() => fetchAboutContent()),
    [run]
  );

  const getContactContent = useCallback(
    () => run<ContactContent | null>(() => fetchContactContent()),
    [run]
  );

  return {
    loading,
    error,
    getCourses,
    getAboutContent,
    getContactContent,
  };
}
