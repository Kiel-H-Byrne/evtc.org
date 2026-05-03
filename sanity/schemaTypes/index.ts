import { type SchemaTypeDefinition } from "sanity";
import { courseType } from "./course";
import { lessonType } from "./lesson";
import { aboutContentType } from "./aboutContent";
import { contactContentType } from "./contactContent";

const studentType: SchemaTypeDefinition = {
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    { name: "name", title: "Full Name", type: "string" },
    { name: "dob", title: "Date of Birth", type: "date" },
    { name: "address", title: "Address", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "courseId", title: "Course ID", type: "string" },
    {
      name: "requiresTransportation",
      title: "Requires Transportation",
      type: "boolean",
    },
    { name: "travelingFrom", title: "Traveling From", type: "string" },
    {
      name: "physicalLimitations",
      title: "Physical Limitations",
      type: "boolean",
    },
    { name: "foodAllergies", title: "Food Allergies", type: "boolean" },
    {
      name: "specificRequirements",
      title: "Specific Requirements",
      type: "text",
    },
    {
      name: "workedInHomeImprovement",
      title: "Worked in Home Improvement",
      type: "boolean",
    },
    { name: "howHeard", title: "How They Heard", type: "string" },
    { name: "registeredAt", title: "Registered At", type: "datetime" },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [studentType, courseType, lessonType, aboutContentType, contactContentType],
};
