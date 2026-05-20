import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "kiel.byrne@gmail.com";
const FROM = "Elite VTC <admin@elitevtc.org>";

type B2BInquiry = {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  courseName: string;
  expectedStudents: string;
  message: string;
};

function b2bAdminHtml(data: B2BInquiry) {
  return `
    <h2>New B2B Inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;">
      <tr><td><strong>Business Name</strong></td><td>${data.businessName}</td></tr>
      <tr><td><strong>Contact Person</strong></td><td>${data.contactPerson}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${data.phone || "—"}</td></tr>
      <tr><td><strong>Course of Interest</strong></td><td>${data.courseName}</td></tr>
      <tr><td><strong>Expected Team Members</strong></td><td>${data.expectedStudents || "—"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${data.message || "—"}</td></tr>
    </table>
  `;
}

function b2bClientHtml(data: B2BInquiry) {
  return `
    <h2>Thank you for your interest, ${data.contactPerson}!</h2>
    <p>We have received your inquiry for <strong>${data.businessName}</strong> regarding the <strong>${data.courseName}</strong>.</p>
    <p>Our team will review your request and get back to you shortly to discuss training your staff.</p>
    <br/>
    <p>— EVTC Team</p>
  `;
}

export async function POST(req: Request) {
  try {
    const body: B2BInquiry = await req.json();

    const [adminRes, clientRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `B2B Inquiry — ${body.businessName}`,
        html: b2bAdminHtml(body),
      }),
      resend.emails.send({
        from: FROM,
        to: [body.email],
        subject: "We've received your inquiry — Elite VTC",
        html: b2bClientHtml(body),
      }),
    ]);

    const error = adminRes.error ?? clientRes.error;
    return Response.json(
      { adminRes, clientRes },
      { status: error ? 500 : 200 },
    );
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
