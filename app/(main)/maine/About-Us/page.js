"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Award, Globe, Target } from "lucide-react";

export default function AboutUsPage() {
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 pt-24 text-center"
      >
        <h1
          className="text-5xl font-bold mb-6 
          bg-gradient-to-r from-white via-gray-200 to-gray-500 
          text-transparent bg-clip-text"
        >
          Elevating Events, Crafting Experiences
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          We transform ordinary moments into extraordinary memories through
          meticulous planning and innovative design.
        </p>
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16"
      >
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: User,
              title: "Personalized Approach",
              description:
                "Every event is unique, tailored to reflect your individual vision and style.",
            },
            {
              icon: Award,
              title: "Excellence Guaranteed",
              description:
                "We set the highest standards in event management and execution.",
            },
            {
              icon: Globe,
              title: "Global Perspective",
              description:
                "Bringing international trends and local insights to every event.",
            },
            {
              icon: Target,
              title: "Precision Planning",
              description:
                "Meticulous attention to detail ensures flawless event experiences.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 
              border border-gray-700 hover:border-gray-600 
              transition-all duration-300 
              hover:scale-105 hover:shadow-2xl"
            >
              <value.icon
                className="w-12 h-12 mb-4 text-white/80 
                bg-gradient-to-br from-blue-400 to-purple-600 
                rounded-full p-3 mx-auto"
              />
              <h3
                className="text-xl font-semibold text-center mb-3 
                bg-gradient-to-r from-white via-gray-200 to-gray-500 
                text-transparent bg-clip-text"
              >
                {value.title}
              </h3>
              <p className="text-gray-400 text-center">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-16"
      >
        <h2
          className="text-4xl font-bold text-center mb-12
          bg-gradient-to-r from-white via-gray-200 to-gray-500 
          text-transparent bg-clip-text"
        >
          Our Creative Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "JJ Eshwar",
              role: "Creative Director",
              image: "/api/placeholder/300/300",
            },
            {
              name: "D Venkat Sai",
              role: "Event Strategist",
              image: "/api/placeholder/300/300",
            },
            {
              name: "Madhu",
              role: "Design Coordinator",
              image: "/api/placeholder/300/300",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center group"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-64 h-64 mx-auto object-cover rounded-full 
                grayscale group-hover:grayscale-0 
                transition-all duration-500 
                border-4 border-gray-700 group-hover:border-gray-500"
              />
              <h3
                className="mt-6 text-2xl font-semibold 
                bg-gradient-to-r from-white via-gray-200 to-gray-500 
                text-transparent bg-clip-text"
              >
                {member.name}
              </h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
