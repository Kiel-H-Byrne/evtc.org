import { type SchemaTypeDefinition } from "sanity";

export const siteSettings: SchemaTypeDefinition = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "comingSoonImage",
      title: "Coming Soon Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
