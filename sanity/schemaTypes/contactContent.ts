import { defineField, defineType } from "sanity";

export const contactContentType = defineType({
  name: "contactContent",
  title: "Contact Content",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Physical Address",
      type: "string",
    }),
  ],
});
