"use client";
import React, { useState } from "react";
import { Section, Input, Select, Button, ButtonOutline } from "@/components/ui/Styled";
import styled from "styled-components";
import type { Course } from "@/components/cms/types";

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
  color: ${(p) => (p.active ? p.theme.colors.accent : p.past ? p.theme.colors.primary : p.theme.colors.textSecondary)};
  transition: ${(p) => p.theme.transitions.default};
`;

const CheckOutBox = styled.div`
  background: ${(p) => p.theme.colors.background};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.medium}px;
  padding: 1.5em;
  margin-bottom: 1.5em;
`;

export function RegistrationForm({ courses, preselectedCourseId }: { courses: Course[], preselectedCourseId?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ 
    courseId: preselectedCourseId || "", 
    agreeToPay: false,
    firstName: "", 
    lastName: "", 
    email: "" 
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const steps = ["Select Course", "Secure Payment", "Student Registration", "Confirmation"];

  function validate() {
    const errs: Partial<typeof form> = {};
    if (step === 0 && !form.courseId) {
      errs.courseId = "Please select a course to checkout.";
    } else if (step === 1 && !form.agreeToPay) {
      errs.agreeToPay = "You must confirm payment to proceed.";
    } else if (step === 2) {
      if (!form.firstName.trim()) errs.firstName = "First name is required.";
      if (!form.lastName.trim()) errs.lastName = "Last name is required.";
      if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Valid email is required.";
    }
    setErrors(errs as any);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (validate()) {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const isChecked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setForm((f) => ({
      ...f,
      [name]: isChecked !== undefined ? isChecked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      // In a real app we would submit the onboarding via API here.
      setStep(3);
    }
  }

  const selectedCourse = courses.find((c) => c.id === form.courseId);

  return (
    <Section>
      <h2 style={{ marginBottom: "0.5em", color: "var(--theme-foreground)" }}>Enroll & Pay</h2>
      <p style={{ color: "var(--theme-text-secondary)", marginBottom: "2em" }}>
        Secure your spot by paying for the course. Registration details will follow your successful payment.
      </p>

      <Stepper>
        {steps.map((s, i) => (
          <Step key={s} active={i === step} past={i < step}>
            {i + 1}. {s}
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <FormRow>
              <Label>Select Training Course</Label>
              <Select name="courseId" value={form.courseId} onChange={handleChange}>
                <option value="">-- Choose a course --</option>
                {courses.filter(c => c.available).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.price > 0 ? `$${c.price.toLocaleString()} USD` : "TBD"})
                  </option>
                ))}
              </Select>
              {errors.courseId && <ErrorMsg>{errors.courseId}</ErrorMsg>}
            </FormRow>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="button" onClick={next}>Continue to Payment</Button>
            </div>
          </div>
        )}

        {step === 1 && selectedCourse && (
          <div>
            <CheckOutBox>
              <h3 style={{ margin: "0 0 1em 0", fontSize: "1.2rem" }}>Payment Details</h3>
              <p><strong>Course:</strong> {selectedCourse.name}</p>
              <p>
                <strong>Total Due:</strong> ${selectedCourse.price.toLocaleString()} {selectedCourse.priceNote}
              </p>
              {selectedCourse.extraMaterial && (
                <p>
                  <strong>Included Materials:</strong> {selectedCourse.extraMaterial.description} (${selectedCourse.extraMaterial.price} USD)
                </p>
              )}
              <div style={{ marginTop: "1.5em", padding: "1em", background: "#fff", borderLeft: "4px solid #C9A227" }}>
                <strong>Important:</strong> {selectedCourse.paymentInstructions || "No alternative payment methods accepted."}
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5em", marginTop: "1.5em", cursor: "pointer" }}>
                <input type="checkbox" name="agreeToPay" checked={form.agreeToPay as boolean} onChange={handleChange} />
                <span style={{ fontWeight: 600 }}>I confirm and authorize this payment.</span>
              </label>
              {errors.agreeToPay && <ErrorMsg style={{ marginTop: "0.5em" }}>{errors.agreeToPay}</ErrorMsg>}
            </CheckOutBox>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonOutline type="button" onClick={handleBack}>Back</ButtonOutline>
              <Button type="button" onClick={next}>Submit Payment</Button>
            </div>
          </div>
        )}

        {step === 2 && selectedCourse && (
          <div>
            <p style={{ color: "#10EF75", fontWeight: 600, marginBottom: "1.5em" }}>
              ✓ Payment successful! Please complete your student profile to finish registration.
            </p>
            <FormRow>
              <Label>First Name</Label>
              <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
              {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Last Name</Label>
              <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
              {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
            </FormRow>
            <FormRow>
              <Label>Email Address</Label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john.doe@example.com" />
              {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
            </FormRow>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
              <Button type="submit">Complete Registration</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "2em 0" }}>
            <h3 style={{ color: "#1F3A5F", fontSize: "1.5rem", marginBottom: "0.5em" }}>Welcome to Elite Vocational Training Center!</h3>
            <p style={{ color: "#6E6E6E", fontSize: "1.1rem" }}>
              Thank you, {form.firstName}. Your payment of ${selectedCourse?.price.toLocaleString()} is confirmed.
            </p>
            <p style={{ color: "#6E6E6E" }}>
              We've sent a detailed onboarding email and your receipt to <strong>{form.email}</strong>.
            </p>
          </div>
        )}
      </form>
    </Section>
  );
}
