// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import categoriesData from "../data/categoryData";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRefs = useRef({});

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

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
            >
              Share your stories.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Inspire the world.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              A clean, modern blogging platform where writers express ideas and connect with a global community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button
              onClick={handleCreateAccount}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Create an Account
            </button>
            <button
              onClick={handleExplorePosts}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-semibold rounded-xl transition duration-200"
            >
              Explore Posts
            </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div className="py-12 md:py-20">
        {categoriesData.map((category, index) => (
          <section
            key={category.name}
            id={category.name}
            ref={categoryRefs.current[category.name]}
            className="mb-16 md:mb-24"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.posts.map((post, idx) => (
                  <motion.div
                    key={post.slug || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.description}
                      </p>
                      <Link
                        to={`/category/${category.name.toLowerCase()}/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}