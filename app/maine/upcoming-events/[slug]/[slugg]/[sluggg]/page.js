"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../../firebase/clientApp";
import {CheckoutPage} from '../../../../../../components/CheckoutPage';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Euro } from "lucide-react";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not found");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePayment({ params }) {
  const EventId = use(params).sluggg;
  const [exploreEvent, setExploreEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const EventRef = collection(db, "Event Data");
        const querySnapshot = await getDocs(EventRef);
        const EventData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const EventItem = EventData.find((event) => event.id === EventId);

        if (!EventItem) {
          setError("Event not found");
        } else {
          setExploreEvent(EventItem);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Failed to fetch event data");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [EventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 rounded-full border-t-4 border-purple-500 border-opacity-50"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Error
          </h2>
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/maine/upcoming-events"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Return to Events
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!exploreEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-gray-400">No event data available</div>
      </div>
    );
  }

  const amount = exploreEvent.fee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Event Registration
        </h1>
        <div className="mb-6 flex items-center space-x-2">
          <span className="text-gray-300">Registration fee:</span>
          <span className="text-green-400 font-semibold">
            {amount} <Euro className="inline-block ml-1" />
          </span>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount * 100, 
            currency: "eur",
          }}
        >
          {/* Your Stripe Checkout or Payment Form Component goes here */}
          <div>Stripe Payment Form</div>
          <CheckoutPage amount={amount}/>
        </Elements>
      </div>
    </div>
  );
}
