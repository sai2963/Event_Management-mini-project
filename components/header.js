"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import NavLink from "../components/nav-link";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const menuItems = [
    { label: "What We Do", href: "/maine/whatwedo" },

    { label: "Team", href: "/maine/About-Us" },
    { label: "Contact", href: "/maine/contact" },
    { label: "Add Event", href: "/maine/add-event" },
    { label: "Upcoming Events", href: "/maine/upcoming-events" },

    ...(isAdmin
      ? [
          { label: "Response", href: "/maine/contact-response" },
          { label: "Registered Events", href: "/maine/registerd-people" },
        ]
      : []),
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-gray-800 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
      
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Link href="/maine">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transition-all duration-500 ease-in-out transform hover:scale-105">
                EventMaster
              </h1>
            </Link>
          </motion.div>

          
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <motion.div key={item.label} variants={itemVariants}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <UserButton />
            </motion.div>
          </nav>

         
          <motion.div variants={itemVariants} className="md:hidden">
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-300 hover:rotate-180"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden absolute top-24 inset-x-0 z-50 bg-gradient-to-b from-[#0F172A] to-[#1E293B] shadow-2xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-2">
              {menuItems.map((item) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:from-cyan-300 hover:to-blue-400 transition-all duration-300">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                className="flex justify-center py-4"
              >
                <UserButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

     
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
