// cms/client.ts
import { createClient } from "@sanity/client";
import { projectId, dataset } from "../../sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: true, // Enable CDN for production performance and caching
});
