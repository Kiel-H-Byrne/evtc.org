"use client";
import type { Course } from "@/components/cms/types";
import {
  Button,
  Input,
  Section,
  Select,
  Textarea,
} from "@/components/ui/Styled";
import React, { useState } from "react";
import styled from "styled-components";

type FormState = {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  courseId: string;
  expectedStudents: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  businessName: "",
  contactPerson: "",
  email: "",
  phone: "",
  courseId: "",
  expectedStudents: "",
  message: "",
};

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 1em;
`;

const Label = styled.label`
  color: ${(p) => p.theme.colors.textSecondary};
  font-weight: ${(p) => p.theme.typography.bodyFontWeightMedium};
  margin-bottom: 0.2em;
`;

const ErrorMsg = styled.div`
  color: ${(p) => p.theme.colors.error};
  font-size: 0.9em;
  font-weight: 500;
  margin-top: -0.5em;
  margin-bottom: 0.5em;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DirectContactInfo = styled.div`
  padding: 1.5em;
  background: ${(p) => p.theme.colors.background};
  border-radius: ${(p) => p.theme.radii.medium}px;
  border: 1px solid ${(p) => p.theme.colors.border};
  height: fit-content;

  h3 {
    margin-top: 0;
    color: ${(p) => p.theme.colors.primary};
  }

  p {
    margin: 0.5em 0;
    color: ${(p) => p.theme.colors.textSecondary};
  }

  strong {
    color: ${(p) => p.theme.colors.text};
  }
`;

export function ContactEnrollmentForm({
  courses,
  preselectedCourseId,
  contactInfo,
}: {
  courses: Course[];
  preselectedCourseId?: string;
  contactInfo: { email: string; phone?: string; address?: string } | null;
}) {
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    courseId: preselectedCourseId || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.contactPerson.trim())
      errs.contactPerson = "Contact person is required.";
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Valid email is required.";
    if (!form.businessName.trim())
      errs.businessName = "Business name is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);
      try {
        const selectedCourse = courses.find((c) => c.id === form.courseId);
        await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            courseName: selectedCourse?.name ?? "General Inquiry",
            type: "B2B_INQUIRY",
          }),
        });
        setSubmitted(true);
      } catch (error) {
        console.error(error);
        setErrors({
          ...errors,
          message: "Failed to send inquiry. Please try again later.",
        });
      } finally {
        setSubmitting(false);
      }
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  }

  if (submitted) {
    return (
      <Section id="contact">
        <div style={{ textAlign: "center", padding: "2em 0" }}>
          <h3
            style={{
              color: "var(--theme-primary)",
              fontSize: "1.5rem",
              marginBottom: "0.5em",
            }}
          >
            Inquiry Received
          </h3>
          <p
            style={{ color: "var(--theme-text-secondary)", fontSize: "1.1rem" }}
          >
            Thank you for reaching out, {form.contactPerson}. We have received
            your inquiry for <strong>{form.businessName}</strong> and will be in
            touch shortly.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contact">
      <h2 style={{ marginBottom: "0.5em", color: "var(--theme-foreground)" }}>
        Contact &amp; Enrollment
      </h2>
      <p style={{ color: "var(--theme-text-secondary)", marginBottom: "2em" }}>
        Interested in training your staff? Contact us today to discuss your
        business needs or enroll a roster of team members.
      </p>

      <ContactGrid>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <Label>Contact Person *</Label>
            <Input
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.contactPerson && (
              <ErrorMsg>{errors.contactPerson}</ErrorMsg>
            )}
          </FormRow>
          <FormRow>
            <Label>Business Name *</Label>
            <Input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Your Company LLC"
            />
            {errors.businessName && <ErrorMsg>{errors.businessName}</ErrorMsg>}
          </FormRow>
          <FormRow>
            <Label>Email Address *</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@business.com"
            />
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          </FormRow>
          <FormRow>
            <Label>Phone Number</Label>
            <Input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
            />
          </FormRow>
          <FormRow>
            <Label>Course of Interest</Label>
            <Select
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
            >
              <option value="">-- Select a course (optional) --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormRow>
          <FormRow>
            <Label>Expected Number of Team Members</Label>
            <Input
              name="expectedStudents"
              type="number"
              value={form.expectedStudents}
              onChange={handleChange}
              placeholder="e.g. 5"
            />
          </FormRow>
          <FormRow>
            <Label>Message / Specific Requirements</Label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your training needs..."
            />
          </FormRow>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>

        <DirectContactInfo>
          <h3>Direct Contact</h3>
          <p>
            Reach out to us directly via phone or email for immediate assistance
            with enrollment.
          </p>
          {contactInfo?.email && (
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                style={{ color: "var(--theme-primary)" }}
              >
                {contactInfo.email}
              </a>
            </p>
          )}
          {contactInfo?.phone && (
            <p>
              <strong>Phone:</strong> {contactInfo.phone}
            </p>
          )}
          {contactInfo?.address && (
            <p>
              <strong>Address:</strong>
              <br />
              {contactInfo.address}
            </p>
          )}
        </DirectContactInfo>
      </ContactGrid>
    </Section>
  );
}
