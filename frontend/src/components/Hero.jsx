// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiEdit3, FiUsers } from "react-icons/fi";
import categoriesData from "../data/categoryData";

// Floating shape component for background decoration
const FloatingShape = ({ className, ...props }) => (
  <motion.div
    className={`absolute rounded-full opacity-10 dark:opacity-5 ${className}`}
    animate={{
      y: [0, 15, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    {...props}
  />
);

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRefs = useRef({});
  const controls = useAnimation();

  useEffect(() => {
    categoriesData.forEach((category) => {
      categoryRefs.current[category.name] = React.createRef();
    });
  }, []);

  useEffect(() => {
    if (selectedCategory && categoryRefs.current[selectedCategory]?.current) {
      categoryRefs.current[selectedCategory].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  const handleCreateAccount = () => navigate("/register");
  const handleExplorePosts = () => {
    document
      .getElementById("Technology")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Stats data
  const stats = [
    { value: "10K+", label: "Active Readers", icon: <FiBookOpen /> },
    { value: "5K+", label: "Articles", icon: <FiEdit3 /> },
    { value: "1K+", label: "Writers", icon: <FiUsers /> },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background shapes */}
        <FloatingShape className="w-64 h-64 bg-blue-500 -top-32 -left-32" />
        <FloatingShape 
          className="w-96 h-96 bg-purple-500 -bottom-48 -right-48" 
          style={{ animationDelay: '2s' }}
        />
        <FloatingShape 
          className="w-80 h-80 bg-indigo-500 top-1/4 -right-40" 
          style={{ animationDelay: '4s' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium"
              >
                Welcome to the future of blogging
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">stories</span>,<br />
                <span className="relative inline-block">
                  <span className="relative z-10">inspire the world</span>
                  <motion.span
                    className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 dark:bg-blue-900/40 -z-0"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Join our community of passionate writers and readers. Share your knowledge, experiences, and stories with the world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              >
                <button
                  onClick={handleCreateAccount}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
                </button>
                <button
                  onClick={handleExplorePosts}
                  className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  Explore Articles
                </button>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of your component remains the same */}
      <div className="py-12 md:py-20 bg-white dark:bg-gray-900">
        {categoriesData.map((category, index) => (
          <section
            key={category.name}
            id={category.name}
            ref={categoryRefs.current[category.name]}
            className="mb-16 md:mb-24"
          >
            {/* ... existing category section ... */}
          </section>
        ))}
      </div>
    </div>
  );
}