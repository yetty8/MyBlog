// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-0 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Name */}
        <div className="text-lg font-semibold tracking-wide">
          Yetbarek Temesgen
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-xl">
          <a
            href="https://x.com/"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Twitter / X"
          >
            <FaXTwitter />
          </a>

          <a
            href="https://www.linkedin.com/in/yetbarek-temesgen-b195526a/"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/yetty8"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} Yetbarek Temesgen — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
