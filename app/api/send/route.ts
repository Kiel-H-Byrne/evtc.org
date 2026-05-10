import type { Student } from "@/components/cms/types";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const writeClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const ADMIN_EMAIL = "kiel.byrne@gmail.com";
const FROM = "Elite VTC <admin@elitevtc.org>";

function yesNo(val: boolean) {
  return val ? "Yes" : "No";
}

function adminHtml(data: Student & { courseName: string }) {
  return `
    <h2>New Student Registration</h2>
    <table cellpadding="6" style="border-collapse:collapse;">
      <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
      <tr><td><strong>DOB</strong></td><td>${data.dob}</td></tr>
      <tr><td><strong>Address</strong></td><td>${data.address}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Course</strong></td><td>${data.courseName}</td></tr>
      ${data.sessionDates ? `<tr><td><strong>Session</strong></td><td>${data.sessionDates}</td></tr>` : ""}
      <tr><td><strong>Requires Transportation</strong></td><td>${yesNo(data.requiresTransportation)}</td></tr>
      <tr><td><strong>Traveling From</strong></td><td>${data.travelingFrom || "—"}</td></tr>
      <tr><td><strong>Physical Limitations</strong></td><td>${yesNo(data.physicalLimitations)}</td></tr>
      <tr><td><strong>Food Allergies</strong></td><td>${yesNo(data.foodAllergies)}</td></tr>
      <tr><td><strong>Specific Requirements</strong></td><td>${data.specificRequirements || "—"}</td></tr>
      <tr><td><strong>Home Improvement Experience</strong></td><td>${yesNo(data.workedInHomeImprovement)}</td></tr>
      <tr><td><strong>How They Heard</strong></td><td>${data.howHeard || "—"}</td></tr>
    </table>
  `;
}

function studentHtml(data: { name: string; courseName: string; sessionDates?: string }) {
  return `
    <h2>Thank you for registering, ${data.name}!</h2>
    <p>Your registration for <strong>${data.courseName}</strong> ${data.sessionDates ? `(${data.sessionDates}) ` : ""}at Elite Vocational Training Center has been received.</p>
    <p>Our team will be in touch with next steps. If you have any questions, reply to this email or contact us at ${ADMIN_EMAIL}.</p>
    <p>— Elite VTC Team</p>
  `;
}

export async function POST(req: Request) {
  try {
    const body: Student & { courseName: string } = await req.json();

    await writeClient.create({
      _type: "student",
      ...body,
      registeredAt: new Date().toISOString(),
    });

    const [adminRes, studentRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `New Student Registration — ${body.name}`,
        html: adminHtml(body),
      }),
      resend.emails.send({
        from: FROM,
        to: [body.email],
        subject: "Your Registration is Confirmed — Elite VTC",
        html: studentHtml(body),
      }),
    ]);

    const error = adminRes.error ?? studentRes.error;
    return Response.json(
      { adminRes, studentRes },
      { status: error ? 500 : 200 },
    );
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
