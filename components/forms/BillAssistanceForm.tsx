"use client";

import { Button } from "@/components/ui/Button";
import { Form, Input, TextArea } from "@/components/ui/Input";
import { SectionText } from "@/components/ui/Section";
import { tokens } from "@/lib/theme";
import { BillForm } from "@/types";

type BillAssistanceFormProps = {
  form: BillForm;
  setForm: React.Dispatch<React.SetStateAction<BillForm>>;
  onSuccess: () => void;
  success: boolean;
  successRef: React.RefObject<HTMLDivElement | null>;
};

export function BillAssistanceForm({
  form,
  setForm,
  onSuccess,
  success,
  successRef,
}: BillAssistanceFormProps) {
  return (
    <Form
      aria-label="Bill Assistance Request Form"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <SectionText as="label" htmlFor="bill-name">
        Full Name
      </SectionText>
      <Input
        id="bill-name"
        name="name"
        type="text"
        required
        autoComplete="name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="bill-email">
        Email
      </SectionText>
      <Input
        id="bill-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="bill-need">
        What do you need help with?
      </SectionText>
      <TextArea
        id="bill-need"
        name="need"
        required
        value={form.need}
        onChange={(e) => setForm((f) => ({ ...f, need: e.target.value }))}
        aria-required="true"
      />
      <Button as="button" type="submit">
        Request Help
      </Button>
      {success && (
        <div
          role="status"
          aria-live="polite"
          tabIndex={-1}
          ref={successRef}
          style={{ color: tokens.colors.success, fontWeight: 700 }}
        >
          Thank you! Your request was received.
        </div>
      )}
    </Form>
  );
}
