import { defineField, defineType } from "sanity";

export const lessonType = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Lesson Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Resource Type",
              type: "string",
              options: {
                list: [
                  { title: "PDF", value: "pdf" },
                  { title: "Slides", value: "slides" },
                  { title: "Video", value: "video" },
                  { title: "Link", value: "link" },
                ],
              },
            }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "locked", title: "Locked", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
  ],
});
