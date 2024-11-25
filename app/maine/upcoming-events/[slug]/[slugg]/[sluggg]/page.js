"use client";
export const metadata = {
  title: "Stripe Payment",
  description: "It's Payment Page ",
};

import { CheckoutPage } from "../../../../../../components/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Euro } from "lucide-react";
import {  use } from "react";
import { motion } from "framer-motion";

import EventFetcher from "components/EventFetcher";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not found");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePayment({ params }) {
  const EventId = use(params).sluggg;
  let amount=0;

  return (
    <>
      <EventFetcher EventId={EventId}>
        {(exploreEvent) => (


          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg"
            >
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/10">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Event Registration
                </h1>

                <div className="mb-8 p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-lg">
                      Event Details:
                    </span>
                    <div className="text-right">
                      <p className="text-purple-300 mb-2">
                        {exploreEvent.event || "Unnamed Event"}
                      </p>
                      {amount = exploreEvent.fee}
                      <div className="flex items-center justify-end space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {amount}
                        </span>
                        <Euro className="text-emerald-400 h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>

                {stripePromise && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: amount * 100,
                      currency: "eur",
                    }}
                  >
                    <div className="bg-gray-700/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/10">
                      <CheckoutPage amount={amount} />
                    </div>
                  </Elements>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </EventFetcher>
    </>
  );
}
