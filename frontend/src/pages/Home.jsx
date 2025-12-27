import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-play and loop video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
    setIsVisible(true);
  }, []);

  const handleCreateAccount = () => navigate("/register");
  const handleExplorePosts = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  // Stats data
  const stats = [
    { value: "10K+", label: "Active Readers", icon: <FiBookOpen size={24} /> },
    { value: "5K+", label: "Articles", icon: <FiEdit3 size={24} /> },
    { value: "1K+", label: "Writers", icon: <FiUsers size={24} /> }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-24">
        {/* Floating background shapes */}
        <FloatingShape className="w-64 h-64 bg-blue-500 -top-32 -left-32" />
        <FloatingShape 
          className="w-96 h-96 bg-purple-500 -bottom-48 -right-48" 
          style={{ animationDelay: '2s' }}
        />
        <FloatingShape 
          className="w-80 h-80 bg-indigo-500 top-1/4 -right-40" 
          style={{ animationDelay: '4s' }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
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
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">stories</span>,<br />
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
              className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              A modern platform where writers express ideas and connect with a global community.
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
                  Start Writing Now
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
              </button>
              <button
                onClick={handleExplorePosts}
                className="px-8 py-4 bg-white/90 hover:bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg dark:bg-gray-800/90 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                Explore Content
              </button>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-10"></div>
        
        <motion.div 
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-6 py-2 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
            Live Demo
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            The <span className="text-blue-600 dark:text-blue-400">Beauty</span> of Live Blogging
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Experience seamless content creation and real-time engagement with our platform.
          </p>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
              <video 
                ref={videoRef}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
                poster="/Blog.mp4"
              >
                <source src="/Blog1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Categories
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="space-y-20">
            {categoriesData.map((category, index) => (
              <motion.div 
                key={category.name} 
                className="group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                  <motion.div className="md:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:shadow-2xl">
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={category.posts[0]?.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="md:w-1/2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {category.posts.slice(0, 4).map((post, idx) => (
                        <Link
                          key={idx}
                          to={`/category/${category.slug}/${post.slug}`}
                          className="block group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            <div className="h-40 overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder.jpg';
                                }}
                              />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
                                {post.description}
                              </p>
                              <div className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center mt-auto">
                                Read more
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {index < categoriesData.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-12"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay -translate-x-1/2 -translate-y-1/2 animate-float"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay translate-x-1/3 translate-y-1/2 animate-float" style={{ animationDelay: '2s' }}></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ready to start your <span className="text-yellow-300">blogging journey</span>?
      </motion.h2>
      
      <motion.p 
        className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Join our community of passionate writers and share your unique voice with the world.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={handleCreateAccount}
          className="group relative px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl 
            hover:bg-gray-100 hover:scale-105 transform transition-all duration-300
            shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center justify-center">
            Get Started Free
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
        </button>

        <button
          onClick={handleExplorePosts}
          className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl
            hover:bg-white/10 hover:scale-105 transform transition-all duration-300
            backdrop-blur-sm"
        >
          <span className="flex items-center justify-center">
            Browse Content
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { value: "10K+", label: "Active Writers" },
          { value: "50K+", label: "Articles" },
          { value: "1M+", label: "Monthly Readers" },
          { value: "24/7", label: "Support" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-indigo-200 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </div>

  {/* Decorative elements */}
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
</section>
    </div>
  );
}