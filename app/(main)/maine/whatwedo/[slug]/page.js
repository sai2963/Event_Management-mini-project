"use client";
import { motion } from "framer-motion";
import EventFetcherData from "../../../../../components/event-data";
import Link from "next/link";
import {use} from "react"

export default function EventDetail({ params }) {
  const { slug } = use(params);

  const pageVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <EventFetcherData EventId={slug}>
      {(exploreEventData) => (
        <motion.div
          initial="initial"
          animate="animate"
          variants={pageVariants}
          className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4 overflow-hidden"
        >
          <div className="max-w-5xl w-full bg-zinc-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden transform transition-all hover:scale-[1.01]">
            {/* Event Image */}
            <motion.div
              variants={itemVariants}
              className="relative w-full h-[400px] md:h-[600px] group overflow-hidden"
            >
              <img
                src={exploreEventData.imageUrl}
                alt={exploreEventData.title || "Event image"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
            </motion.div>

            {/* Event Content */}
            <div className="p-8 md:p-12 space-y-8">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 leading-tight"
              >
                {exploreEventData.title}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-zinc-300 leading-relaxed tracking-wide"
              >
                {exploreEventData.content}
              </motion.p>

              {/* Action Button */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mt-8"
              >
                <Link href="/maine/contact">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out transform hover:rotate-1"
                  >
                    Book Your Event
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </EventFetcherData>
  );
}