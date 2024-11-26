'use client';
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function LandingHeader() {
  const { user } = useUser();
  console.log(user);
  

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-transparent min-h-[80px] w-full fixed top-0 left-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link 
            href={user ? "/maine" : "/"} 
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-3xl font-bold tracking-tight hover:scale-105 transition-transform duration-300"
          >
            Event Master
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {user ? (
            <Link 
              href="/maine" 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Planning
            </Link>
          ) : (
            <div className="flex space-x-4">
              <SignInButton mode="modal">
                <button className="px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg">
                  Sign In
                </button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <button className="px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}