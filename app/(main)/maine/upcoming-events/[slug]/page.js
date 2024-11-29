"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import Link from "next/link";
import { motion } from "framer-motion";
import { Euro, Calendar, MapPin, Clock, Users } from "lucide-react";
import {use} from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function ExploreEvent({ params }) {
  const eventId = use(params)?.slug;
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
        console.error("Error fetching event data:", error);
        setError("Failed to fetch event data");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-20 w-20 rounded-full border-t-4 border-l-4 border-purple-500 border-opacity-75 shadow-lg shadow-purple-500/20"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-red-500/10"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Error Occurred
          </h2>
          <p className="text-red-400 mb-8 text-lg">{error}</p>
          <Link
            href="/maine/upcoming-events"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            Return to Events
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!exploreEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-xl font-medium"
        >
          No event data available
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"
      />
      
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Hero Section */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-purple-500/10"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
            <div className="relative p-8 sm:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
              >
                {exploreEvent?.event || "Untitled Event"}
              </motion.h1>

              {/* Image Section */}
              {exploreEvent?.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <img
                    src={exploreEvent.imageUrl}
                    alt={exploreEvent.event || "Event image"}
                    className="relative w-full h-[400px] object-cover rounded-xl shadow-2xl transform group-hover:scale-[1.01] transition-all duration-500"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                      e.target.onerror = null;
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Event Details Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl backdrop-blur-xl border border-purple-500/10 shadow-xl"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Event Details
              </h3>
              
              {exploreEvent?.shortnote && (
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {exploreEvent.shortnote}
                </p>
              )}

              <div className="space-y-4">
                {exploreEvent?.date && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-purple-400 h-5 w-5" />
                    <span className="text-gray-300">{exploreEvent.date}</span>
                  </div>
                )}
                {exploreEvent?.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-purple-400 h-5 w-5" />
                    <span className="text-gray-300">{exploreEvent.location}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Registration Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl backdrop-blur-xl border border-purple-500/10 shadow-xl"
            >
              {exploreEvent?.fee != null && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Registration Fee
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {exploreEvent.fee}
                    </span>
                    <Euro className="text-emerald-400 h-8 w-8" />
                  </div>
                </div>
              )}

              <Link href={`/maine/upcoming-events/${eventId}/${eventId}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Register Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Description Section */}
          {exploreEvent?.description && (
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl backdrop-blur-xl border border-purple-500/10 shadow-xl"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                About the Event
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {exploreEvent.description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Organization Section */}
          {exploreEvent?.organization && (
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl backdrop-blur-xl border border-purple-500/10 shadow-xl"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Organized by
              </h3>
              <p className="text-2xl text-white">
                {exploreEvent.organization}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}