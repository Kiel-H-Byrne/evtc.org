import { defineField, defineType } from "sanity";

export const aboutContentType = defineType({
  name: "aboutContent",
  title: "About Content",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
