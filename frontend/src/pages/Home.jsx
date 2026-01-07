import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiEdit3, FiUsers } from "react-icons/fi";
import categoriesData from "../data/categoryData";

/* ---------- Floating Shape ---------- */
const FloatingShape = ({ className, ...props }) => (
  <motion.div
    className={`absolute rounded-full opacity-10 dark:opacity-5 ${className}`}
    animate={{ y: [0, 20, 0], x: [0, 12, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    {...props}
  />
);

/* ---------- Animated Counter ---------- */
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ""));
    const duration = 1200;
    const increment = end / (duration / 16);

    const step = () => {
      start += increment;
      if (start < end) {
        setDisplay(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setDisplay(end);
      }
    };

    step();
  }, [value]);

  return <span>{display.toLocaleString()}+</span>;
};

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* ---------- Parallax Hero ---------- */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], ["0%", "8%"]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    setIsVisible(true);
  }, []);

  const handleCreateAccount = () => navigate("/register");
  const handleExplorePosts = () =>
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { value: "10000+", label: "Active Readers", icon: <FiBookOpen size={26} /> },
    { value: "5000+", label: "Articles Published", icon: <FiEdit3 size={26} /> },
    { value: "1000+", label: "Verified Writers", icon: <FiUsers size={26} /> }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 overflow-hidden">

      {/* ================= HERO (REPLACED) ================= */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogbg.jpg')", y: bgY }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Floating shapes */}
        <FloatingShape className="w-72 h-72 bg-blue-500 -top-32 -left-32" />
        <FloatingShape className="w-96 h-96 bg-purple-500 -bottom-48 -right-48" />
        <FloatingShape className="w-80 h-80 bg-indigo-500 top-1/4 -right-40" />

        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2 mb-6 text-sm font-medium rounded-full bg-white/20 backdrop-blur">
              Built for writers who want impact
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Publish smarter.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Grow faster.
              </span>
              <br /> Inspire globally.
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
              A modern blogging platform with real-time publishing,
              discoverability, and a community built for serious creators.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleCreateAccount}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold shadow-xl transition-transform hover:-translate-y-1"
              >
                Start Writing <FiArrowRight className="inline ml-2" />
              </button>

              <button
                onClick={handleExplorePosts}
                className="px-8 py-4 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold shadow-lg"
              >
                Explore Content
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-xl"
                >
                  <div className="flex justify-center mb-3 text-blue-300">
                    {s.icon}
                  </div>
                  <div className="text-3xl font-bold">
                    <AnimatedNumber value={s.value} />
                  </div>
                  <div className="text-gray-200">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ================= END HERO ================= */}

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
              Discover what people are reading
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
