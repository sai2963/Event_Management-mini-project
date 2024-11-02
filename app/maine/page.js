'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen p-10 text-white">
      <section className="container mx-auto space-y-16">

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            Bringing Ideas to Life
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Elevate your brand with our exceptional event planning and design services.
          </p>
        </motion.div>


        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 text-center">
              Our Premium Services
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Event Planning', colorFrom: 'from-yellow-400', colorTo: 'to-orange-500' },
              { title: 'Design & Decor', colorFrom: 'from-pink-500', colorTo: 'to-purple-600' },
              { title: 'Brand Consulting', colorFrom: 'from-green-400', colorTo: 'to-teal-500' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-6 bg-gradient-to-br ${service.colorFrom} ${service.colorTo} rounded-lg shadow-lg`}
              >
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-gray-200">
                  Crafting unforgettable experiences with attention to every detail.
                </p>
              </motion.div>
            ))}
          </div>
        </section>


        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Ready to Create Magic?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Let's make your vision a reality with our tailored event solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full text-white font-semibold"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default HomePage;