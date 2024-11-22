"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Euro } from "lucide-react";

export const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Math.round(amount * 100) }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to initialize payment. Please try again.");
        console.error("Payment Intent Error:", error);
      }
    };

    if (amount) {
      createPaymentIntent();
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { error: submitError } = await elements.submit();
      
      if (submitError) {
        throw submitError;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/maine/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center h-40">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <PaymentElement className="mb-4" />
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex items-center justify-center w-full p-4 bg-black text-white rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Pay {amount} <Euro className="h-4 w-4" />
          </span>
        )}
      </button>
    </form>
  );
};