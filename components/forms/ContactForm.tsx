"use client";

import { Button } from "@/components/ui/Button";
import { Form, Input, TextArea } from "@/components/ui/Input";
import { SectionText } from "@/components/ui/Section";
import { tokens } from "@/lib/theme";
import { ContactForm as ContactFormType } from "@/types";

type ContactFormProps = {
  form: ContactFormType;
  setForm: React.Dispatch<React.SetStateAction<ContactFormType>>;
  onSuccess: () => void;
  success: boolean;
  successRef: React.RefObject<HTMLDivElement | null>;
};

export function ContactForm({
  form,
  setForm,
  onSuccess,
  success,
  successRef,
}: ContactFormProps) {
  return (
    <Form
      aria-label="Contact/Assistance Request Form"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <SectionText as="label" htmlFor="contact-name">
        Full Name
      </SectionText>
      <Input
        id="contact-name"
        name="name"
        type="text"
        required
        autoComplete="name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="contact-email">
        Email
      </SectionText>
      <Input
        id="contact-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        aria-required="true"
      />
      <SectionText as="label" htmlFor="contact-message">
        How can we help?
      </SectionText>
      <TextArea
        id="contact-message"
        name="message"
        required
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        aria-required="true"
      />
      <Button as="button" type="submit">
        Send
      </Button>
      {success && (
        <div
          role="status"
          aria-live="polite"
          tabIndex={-1}
          ref={successRef}
          style={{ color: tokens.colors.success, fontWeight: 700 }}
        >
          Thank you for reaching out! We'll be in touch.
        </div>
      )}
    </Form>
  );
}
