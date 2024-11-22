"use client";

import { useState, useEffect, use } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import Link from "next/link";
import { motion } from "framer-motion";
import { Euro } from "lucide-react";

export default function ExploreEvent({ params }) {
  const eventId = use(params).slug;
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
        const EventItem = EventData.find((event) => event.id === eventId);
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
  }, [eventId]);

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

  const EventContent = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
            <div className="relative p-8 sm:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
              >
                {exploreEvent?.event || "Untitled Event"}
              </motion.h1>

              {exploreEvent?.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <img
                    src={exploreEvent.imageUrl}
                    alt={exploreEvent.event || "Event image"}
                    className="w-full h-auto rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                      e.target.onerror = null;
                    }}
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {exploreEvent?.shortnote && (
                  <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {exploreEvent.shortnote}
                    </p>
                  </div>
                )}

                {exploreEvent?.description && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      {exploreEvent.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exploreEvent?.fee != null && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
                    >
                      <h3 className="text-purple-400 font-semibold mb-2">
                        Registration Fee
                      </h3>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {exploreEvent.fee} <Euro className="h-4 w-4" />
                      </p>
                    </motion.div>
                  )}

                  {exploreEvent?.organization && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
                    >
                      <h3 className="text-purple-400 font-semibold mb-2">
                        Organized by
                      </h3>
                      <p className="text-2xl font-bold text-white">
                        {exploreEvent.organization}
                      </p>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex justify-center"
                >
                  <Link href={`/maine/upcoming-events/${eventId}/${eventId}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      Register Now
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return <EventContent />;
}