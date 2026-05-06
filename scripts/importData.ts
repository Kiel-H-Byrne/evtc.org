import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";


const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function importData() {
  const dbPath = path.resolve(__dirname, "../lib/fallbackDb.json");
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  console.log("Starting import...");

  const transaction = client.transaction();

  // Import about content
  if (data.about) {
    transaction.createOrReplace({
      _id: "aboutContent-singleton",
      _type: "aboutContent",
      heading: data.about.heading,
      body: data.about.body,
    });
    console.log("Added aboutContent to transaction");
  }

  // Import contact content
  if (data.contact) {
    transaction.createOrReplace({
      _id: "contactContent-singleton",
      _type: "contactContent",
      email: data.contact.email,
      phone: data.contact.phone,
      address: data.contact.address,
    });
    console.log("Added contactContent to transaction");
  }

  // Import courses and their lessons
  if (data.courses) {
    for (const course of data.courses) {
      // First, create the lessons
      const lessonRefs = [];
      if (course.lessons) {
        for (const lesson of course.lessons) {
          const sanityLessonId = `lesson-${lesson.id}`;
          
          // Format resources to add _key
          const formattedResources = lesson.resources?.map((res: any, index: number) => ({
            _key: `res-${index}-${Date.now()}`,
            type: res.type,
            name: res.name,
            url: res.url,
            locked: res.locked,
          })) || [];

          transaction.createOrReplace({
            _id: sanityLessonId,
            _type: "lesson",
            name: lesson.name,
            resources: formattedResources,
          });
          
          lessonRefs.push({
            _key: `ref-${lesson.id}-${Date.now()}`,
            _type: "reference",
            _ref: sanityLessonId,
          });
          console.log(`Added lesson: ${lesson.name}`);
        }
      }

      // Format extraMaterial
      let formattedExtra = undefined;
      if (course.extraMaterial) {
        formattedExtra = {
          description: course.extraMaterial.description,
          price: course.extraMaterial.price,
          priceNote: course.extraMaterial.priceNote,
        };
      }

      // Create the course
      const sanityCourseId = `course-${course.id}`;
      transaction.createOrReplace({
        _id: sanityCourseId,
        _type: "course",
        name: course.name,
        description: course.description,
        schedule: course.schedule,
        price: course.price,
        priceNote: course.priceNote,
        extraMaterial: formattedExtra,
        paymentInstructions: course.paymentInstructions,
        available: course.available,
        availableDate: course.availableDate,
        lessons: lessonRefs,
      });
      console.log(`Added course: ${course.name}`);
    }
  }

  try {
    await transaction.commit();
    console.log("Transaction committed successfully. Data imported to Sanity.");
  } catch (error) {
    console.error("Error committing transaction:", error);
  }
}

importData();
