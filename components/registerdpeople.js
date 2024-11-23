'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Mail, Phone, Calendar, Clock } from 'lucide-react';

export default function RegisteredPeople({ data }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
      >
        Registered Participants
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        {data.map((registration, index) => (
          <motion.div
            key={registration.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 hover:border-gray-700 transition duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-purple-400" />
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-lg font-medium text-white"
                    >
                      {registration.name}
                    </motion.p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <p className="text-gray-300">
                      {registration.organization}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-pink-400" />
                    <p className="text-gray-300">
                      {registration.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <p className="text-gray-300">
                      {registration.phone}
                    </p>
                  </div>

                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <p className="text-gray-300">
                      {registration.event}
                    </p>
                  </motion.div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-red-400" />
                    <p className="text-gray-300">
                      {registration.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}