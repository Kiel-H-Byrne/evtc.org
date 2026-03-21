"use client";

import { Button } from "@/components/ui/Button";
import { Form, Input, TextArea } from "@/components/ui/Input";
import { SectionText } from "@/components/ui/Section";
import { tokens } from "@/lib/theme";
import { ScholarshipForm as ScholarshipFormType } from "@/types";

type ScholarshipFormProps = {
  form: ScholarshipFormType;
  setForm: React.Dispatch<React.SetStateAction<ScholarshipFormType>>;
  onSuccess: () => void;
  success: boolean;
  successRef: React.RefObject<HTMLDivElement | null>;
};

export function ScholarshipAppForm({
  form,
  setForm,
  onSuccess,
  success,
  successRef,
}: ScholarshipFormProps) {
  return (
    <Form
      aria-label="Scholarship Application Form"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <SectionText as="label" htmlFor="sch-name">
        Full Name
      </SectionText>
      <Input
        id="sch-name"
        name="name"
        type="text"
        required
        autoComplete="name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="sch-email">
        Email
      </SectionText>
      <Input
        id="sch-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="sch-essay">
        Why do you deserve this scholarship?
      </SectionText>
      <TextArea
        id="sch-essay"
        name="essay"
        required
        value={form.essay}
        onChange={(e) => setForm((f) => ({ ...f, essay: e.target.value }))}
        aria-required="true"
      />
      <Button as="button" type="submit">
        Apply Now
      </Button>
      {success && (
        <div
          role="status"
          aria-live="polite"
          tabIndex={-1}
          ref={successRef}
          style={{ color: tokens.colors.success, fontWeight: 700 }}
        >
          Thank you! Your application was received.
        </div>
      )}
    </Form>
  );
}
