"use client";

import { useState, useEffect, use } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EventRegistration({ params }) {
  const EventId = params.slugg;
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-[#1a1a2e] rounded-2xl shadow-2xl shadow-purple-900/30 p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            {exploreEvent.event} Registration
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 text-center mb-6"
          >
            <p className="text-xl font-semibold">Date: {exploreEvent.eventdate}</p>
          </motion.div>

          <form className="space-y-4">
            {[
              { name: "name", label: "Your Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Contact Number", type: "tel" },
              {
                name: "organization",
                label: "Organization/College",
                type: "text",
              },
            ].map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  
                  
                  required
                  className="w-full px-4 py-2 bg-[#252642] border border-[#3a3a5e] rounded-xl text-white 
                focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                />
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
            rounded-xl text-white font-bold hover:from-purple-700 hover:to-pink-700 
            transition-all duration-300 transform hover:shadow-xl hover:shadow-purple-500/30"
            >
              Register Now
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
