import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import categoriesData from "../data/categoryData";

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Auto-play and loop video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const handleCreateAccount = () => navigate("/register");
  const handleExplorePosts = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-black/30 dark:to-black/50"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Share your stories.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Inspire the world.
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              A modern platform where writers express ideas and connect with a global community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleCreateAccount}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Start Writing Now
              </button>
              <button
                onClick={handleExplorePosts}
                className="px-8 py-4 bg-white/90 hover:bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/90 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                Explore Content
              </button>
            </div>
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your blogging journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who are already sharing their stories and making an impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleCreateAccount}
                className="px-8 py-3 bg-white text-blue-700 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={handleExplorePosts}
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-300"
              >
                Browse Content
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}