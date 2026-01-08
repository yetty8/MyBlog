import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaTwitter className="w-4 h-4" />, url: "https://x.com/", label: "Twitter / X" },
    { icon: <FaLinkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/yetbarek-temesgen-b195526a/", label: "LinkedIn" },
    { icon: <FaGithub className="w-4 h-4" />, url: "https://github.com/yetty8", label: "GitHub" },
    { icon: <FaEnvelope className="w-4 h-4" />, url: "mailto:contact@yetbarek.com", label: "Email" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const categories = ["Technology", "Lifestyle", "Education", "Business", "Travel"];

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Socials */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Yetbarek Temesgen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Full-stack developer crafting exceptional digital experiences with modern technologies and clean code.
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  whileHover={{ y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((cat, idx) => {
                const slug = cat.toLowerCase();
                return (
                  <motion.li
                    key={cat}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                  >
                    <NavLink
                      to={`/category/${slug}`}
                      className={({ isActive }) =>
                        `text-sm transition flex items-center group
                        ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        }`
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {cat}
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <span className="block font-medium text-gray-900 dark:text-white">Email</span>
                <a
                  href="mailto:contact@yetbarek.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  contact@yetbarek.com
                </a>
              </li>
              <li>
                <span className="block font-medium text-gray-900 dark:text-white">Location</span>
                <span>Toronto, Ontario, Canada</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Subscribe to receive updates on my latest projects and articles.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                aria-label="Subscribe"
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-100 dark:border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {currentYear} Yetbarek Temesgen. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-4 md:mt-0">
            <NavLink
              to="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              Terms of Service
            </NavLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

