"use client";
import type { Course } from "@/components/cms/types";
import {
  Button,
  ButtonOutline,
  Input,
  Section,
  Select,
  Textarea,
} from "@/components/ui/Styled";
import React, { useState } from "react";
import styled from "styled-components";

type FormState = {
  courseId: string;
  name: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  requiresTransportation: boolean;
  travelingFrom: string;
  physicalLimitations: boolean;
  foodAllergies: boolean;
  specificRequirements: string;
  workedInHomeImprovement: boolean;
  howHeard: string;
  agreeToPay: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  courseId: "",
  name: "",
  dob: "",
  address: "",
  phone: "",
  email: "",
  requiresTransportation: false,
  travelingFrom: "",
  physicalLimitations: false,
  foodAllergies: false,
  specificRequirements: "",
  workedInHomeImprovement: false,
  howHeard: "",
  agreeToPay: false,
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

const Stepper = styled.div`
  display: flex;
  gap: 1em;
  margin-bottom: 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

const Step = styled.div<{ active?: boolean; past?: boolean }>`
  font-weight: ${(p) => (p.active || p.past ? 600 : 400)};
  color: ${(p) =>
    p.active
      ? p.theme.colors.accent
      : p.past
        ? p.theme.colors.primary
        : p.theme.colors.textSecondary};
  transition: ${(p) => p.theme.transitions.default};
`;

const CheckOutBox = styled.div`
  background: ${(p) => p.theme.colors.background};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.medium}px;
  padding: 1.5em;
  margin-bottom: 1.5em;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5em;
  margin-bottom: 1em;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
  font-size: 1rem;
`;

export function RegistrationForm({
  courses,
  preselectedCourseId,
}: {
  courses: Course[];
  preselectedCourseId?: string;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    courseId: preselectedCourseId || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    "Course Selection",
    "Student Registration",
    "Payment",
    "Confirmation",
  ];

  function validate(): boolean {
    const errs: FormErrors = {};
    if (step === 0 && !form.courseId) {
      errs.courseId = "Please select a course to continue.";
    } else if (step === 1) {
      if (!form.name.trim()) errs.name = "Full name is required.";
      if (!form.dob) errs.dob = "Date of birth is required.";
      if (!form.address.trim()) errs.address = "Address is required.";
      if (!form.phone.trim()) errs.phone = "Phone number is required.";
      if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
        errs.email = "Valid email is required.";
    } else if (step === 2 && !form.agreeToPay) {
      errs.agreeToPay = "You must confirm payment to proceed.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (validate()) setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "radio"
          ? value === "true"
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          courseName: selectedCourse?.name ?? "",
        }),
      });
    } finally {
      setSubmitting(false);
      setStep(3);
    }
  }

  const selectedCourse = courses.find((c) => c.id === form.courseId);

  return (
    <Section>
      <h2 style={{ marginBottom: "0.5em", color: "var(--theme-foreground)" }}>
        Enroll &amp; Register
      </h2>
      <p style={{ color: "var(--theme-text-secondary)", marginBottom: "2em" }}>
        Complete your course registration in four simple steps.
      </p>

      <Stepper>
        {steps.map((s, i) => (
          <Step key={s} active={i === step} past={i < step}>
            {i + 1}. {s}
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {/* Step 0 — Course Selection */}
        {step === 0 && (
          <div>
            <FormRow>
              <Label>Select Training Course</Label>
              <Select
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
              >
                <option value="">-- Choose a course --</option>
                {courses
                  .filter((c) => c.available)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (
                      {c.price > 0 ? `$${c.price.toLocaleString()} USD` : "TBD"}
                      )
                    </option>
                  ))}
              </Select>
              {errors.courseId && <ErrorMsg>{errors.courseId}</ErrorMsg>}
            </FormRow>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="button" onClick={next}>
                Continue to Registration
              </Button>
            </div>
          </div>
        )}

        {/* Step 1 — Student Registration */}
        {step === 1 && (
          <div>
            <FormRow>
              <Label>Full Name *</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
              {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Date of Birth *</Label>
              <Input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />
              {errors.dob && <ErrorMsg>{errors.dob}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Address *</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State, ZIP"
              />
              {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Phone Number *</Label>
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
              />
              {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Email Address *</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane.doe@example.com"
              />
              {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Do you require any transportation?</Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="requiresTransportation"
                    value="true"
                    checked={form.requiresTransportation === true}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="requiresTransportation"
                    value="false"
                    checked={form.requiresTransportation === false}
                    onChange={handleChange}
                  />{" "}
                  No
                </RadioLabel>
              </RadioGroup>
            </FormRow>
            <FormRow>
              <Label>Where are you traveling from?</Label>
              <Input
                name="travelingFrom"
                value={form.travelingFrom}
                onChange={handleChange}
                placeholder="City, State"
              />
            </FormRow>
            <FormRow>
              <Label>
                Do you have any physical limitations or health conditions that
                might affect your ability to handle chemicals and equipment?
              </Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="physicalLimitations"
                    value="true"
                    checked={form.physicalLimitations === true}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="physicalLimitations"
                    value="false"
                    checked={form.physicalLimitations === false}
                    onChange={handleChange}
                  />{" "}
                  No
                </RadioLabel>
              </RadioGroup>
            </FormRow>
            <FormRow>
              <Label>
                Do you have any food allergies or dietary restrictions?
              </Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="foodAllergies"
                    value="true"
                    checked={form.foodAllergies === true}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="foodAllergies"
                    value="false"
                    checked={form.foodAllergies === false}
                    onChange={handleChange}
                  />{" "}
                  No
                </RadioLabel>
              </RadioGroup>
            </FormRow>
            <FormRow>
              <Label>
                Do you have any specific requirements or needs that can be
                addressed to ensure your success?
              </Label>
              <Textarea
                name="specificRequirements"
                value={form.specificRequirements}
                onChange={handleChange}
                placeholder="Please describe any specific needs..."
              />
            </FormRow>
            <FormRow>
              <Label>
                Have you ever worked or currently work in the home improvement
                industry?
              </Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="workedInHomeImprovement"
                    value="true"
                    checked={form.workedInHomeImprovement === true}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="workedInHomeImprovement"
                    value="false"
                    checked={form.workedInHomeImprovement === false}
                    onChange={handleChange}
                  />{" "}
                  No
                </RadioLabel>
              </RadioGroup>
            </FormRow>
            <FormRow>
              <Label>How did you hear about the training program?</Label>
              <Input
                name="howHeard"
                value={form.howHeard}
                onChange={handleChange}
                placeholder="e.g. Social media, friend, flyer..."
              />
            </FormRow>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <ButtonOutline type="button" onClick={handleBack}>
                Back
              </ButtonOutline>
              <Button type="button" onClick={next}>
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && selectedCourse && (
          <div>
            <CheckOutBox>
              <h3 style={{ margin: "0 0 1em 0", fontSize: "1.2rem" }}>
                Payment Details
              </h3>
              <p>
                <strong>Course:</strong> {selectedCourse.name}
              </p>
              <p>
                <strong>Total Due:</strong> $
                {selectedCourse.price.toLocaleString()}{" "}
                {selectedCourse.priceNote}
              </p>
              {selectedCourse.extraMaterial && (
                <p>
                  <strong>Included Materials:</strong>{" "}
                  {selectedCourse.extraMaterial.description} ($
                  {selectedCourse.extraMaterial.price} USD)
                </p>
              )}
              <div
                style={{
                  marginTop: "1.5em",
                  padding: "1em",
                  background: "#fff",
                  borderLeft: "4px solid #C9A227",
                }}
              >
                <strong>Important:</strong>{" "}
                {selectedCourse.paymentInstructions ||
                  "No alternative payment methods accepted."}
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5em",
                  marginTop: "1.5em",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="agreeToPay"
                  checked={form.agreeToPay}
                  onChange={handleChange}
                />
                <span style={{ fontWeight: 600 }}>
                  I confirm and authorize this payment.
                </span>
              </label>
              {errors.agreeToPay && (
                <ErrorMsg style={{ marginTop: "0.5em" }}>
                  {errors.agreeToPay}
                </ErrorMsg>
              )}
            </CheckOutBox>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonOutline type="button" onClick={handleBack}>
                Back
              </ButtonOutline>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Confirm & Complete Registration"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div style={{ textAlign: "center", padding: "2em 0" }}>
            <h3
              style={{
                color: "#1F3A5F",
                fontSize: "1.5rem",
                marginBottom: "0.5em",
              }}
            >
              Welcome to Elite Vocational Training Center!
            </h3>
            <p style={{ color: "#6E6E6E", fontSize: "1.1rem" }}>
              Thank you, {form.name}. Your registration for{" "}
              <strong>{selectedCourse?.name}</strong> has been received.
            </p>
            <p style={{ color: "#6E6E6E" }}>
              Confirmation emails have been sent to{" "}
              <strong>{form.email}</strong>.
            </p>
          </div>
        )}
      </form>
    </Section>
  );
}
