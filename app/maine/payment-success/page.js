"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Payment Success",
  description: "Your Payment has Succesfully Done",
};

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.8,
        }}
        className="bg-gradient-to-tr from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle2
            className="text-green-400"
            size={80}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          You have successfully registered for the event. Get ready for an
          incredible experience!
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
