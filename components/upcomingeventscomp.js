"use client";
import React from "react";
import { motion } from "framer-motion";

import { CalendarDays, MapPin, Ticket } from "lucide-react";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
export default function UpEvents({EventData}) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Upcoming Events
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EventData.map((edata) => (
              <motion.div
                key={edata.id}
                variants={item}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    src={edata.imageUrl}
                    alt={edata.shortnote}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {edata.shortnote}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <span>{edata.organization}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-300">
                      <CalendarDays className="w-5 h-5 text-purple-500" />
                      <span>{edata.eventdate}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-300">
                      <Ticket className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold text-purple-400">
                        {edata.fee}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Register Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
