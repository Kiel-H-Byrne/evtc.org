// cms/client.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: true,
});
