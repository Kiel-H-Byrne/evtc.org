"use client";

import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/Styled";
import { useState } from "react";
import styled from "styled-components";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";

const ErrorMsg = styled.div`
  color: ${(p) => p.theme.colors.error};
  font-size: 0.9em;
  font-weight: 500;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export function StripePaymentForm({
  clientSecret,
  onSuccess,
}: {
  clientSecret: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
    setCardComplete(event.complete);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message || "An unexpected error occurred.");
      setSubmitting(false);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <div>
      <CardElement onChange={handleCardChange} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || submitting || !cardComplete}
        style={{ marginTop: "1em" }}
      >
        {submitting ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}
