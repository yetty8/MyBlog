// src/components/BackToHome.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BackToHome() {
  const location = useLocation();

  // Hide button on homepage and other main pages where Navbar is visible
  if (location.pathname === "/" || 
      location.pathname === "/login" || 
      location.pathname === "/register" ||
      location.pathname.startsWith("/category/")) {
    return null;
  }

  // For post pages, show a subtle back button
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link
        to={location.state?.from || "/"}
        className="
          group flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 
          text-gray-600 dark:text-gray-300 text-sm font-medium px-3 py-1.5 
          rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/80
          backdrop-blur-sm border border-gray-200 dark:border-gray-700
          transition-all duration-200
        "
      >
        <FaChevronLeft className="text-xs" />
        <span>Back</span>
      </Link>
    </motion.div>
  );
}