"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EventFetcher({ EventId, children }) {
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

  return children(exploreEvent, null);
}