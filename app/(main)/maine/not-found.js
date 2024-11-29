'use client'
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";

export default function Not_Found() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-center max-w-md w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-12 shadow-2xl"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="text-7xl font-bold mb-4 
            bg-gradient-to-r from-white via-gray-200 to-gray-500 
            text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="text-xl text-gray-400 mb-6"
        >
          Oops! Page Not Found
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
          }}
        >
          <Link
            href="/maine"
            className="group inline-flex items-center justify-center 
            px-6 py-3 
            bg-gradient-to-r from-blue-600 to-purple-600 
            text-white font-semibold rounded-full 
            hover:from-blue-700 hover:to-purple-700 
            transition-all duration-300 
            transform hover:scale-105 
            hover:shadow-xl"
          >
            <span className="mr-2">Return to Home</span>
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
