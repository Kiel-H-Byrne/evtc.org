// cms/content.ts
import { sanityClient } from "./client";
import type { Course, AboutContent, ContactContent } from "./types";

export async function fetchCourses(): Promise<Course[]> {
  return sanityClient.fetch(
    `*[_type == "course"] | order(available desc, price desc) {
      "id": _id,
      name,
      description,
      schedule,
      price,
      priceNote,
      extraMaterial {
        description,
        price,
        priceNote
      },
      paymentInstructions,
      available,
      availableDate,
      lessons[]->{
        "id": _id,
        name,
        resources[]{
          "id": _key,
          type,
          name,
          url,
          locked
        }
      }
    }`
  );
}

export async function fetchAboutContent(): Promise<AboutContent | null> {
  return sanityClient.fetch(
    `*[_type == "aboutContent"][0] {
      heading,
      body
    }`
  );
}

export async function fetchContactContent(): Promise<ContactContent | null> {
  return sanityClient.fetch(
    `*[_type == "contactContent"][0] {
      email,
      phone,
      address
    }`
  );
}
