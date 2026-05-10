import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Course Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceNote",
      title: "Price Note",
      type: "string",
    }),
    defineField({
      name: "extraMaterial",
      title: "Extra Material",
      type: "object",
      fields: [
        defineField({ name: "description", title: "Description", type: "string" }),
        defineField({ name: "price", title: "Price", type: "number" }),
        defineField({ name: "priceNote", title: "Price Note", type: "string" }),
      ],
    }),
    defineField({
      name: "paymentInstructions",
      title: "Payment Instructions",
      type: "text",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "availableDate",
      title: "Available Date",
      type: "date",
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
    defineField({
      name: "sessions",
      title: "Course Sessions",
      type: "array",
      of: [
        {
          type: "object",
          name: "session",
          fields: [
            { name: "startDate", type: "date", title: "Start Date", validation: (Rule) => Rule.required() },
            { name: "endDate", type: "date", title: "End Date", validation: (Rule) => Rule.required() },
            { name: "label", type: "string", title: "Label (e.g. Summer Cohort)" },
          ],
          preview: {
            select: {
              startDate: "startDate",
              endDate: "endDate",
              label: "label",
            },
            prepare({ startDate, endDate, label }) {
              return {
                title: label || `${startDate} to ${endDate}`,
                subtitle: label ? `${startDate} to ${endDate}` : "",
              };
            },
          },
        },
      ],
    }),
  ],
});
