// src/components/BackToHome.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function BackToHome() {
  const location = useLocation();

  // Hide button on homepage
  if (location.pathname === "/") return null;

  return (
    <Link
      to="/"
      className="
        fixed top-5 left-5 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 
        text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 rounded-xl 
        shadow-lg hover:shadow-2xl transition-all
      "
    >
      <FaHome /> Back to Home
    </Link>
  );
}
