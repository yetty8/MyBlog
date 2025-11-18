// src/components/CodingShowcase.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CodingShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black border-t border-gray-200/50 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center text-center gap-6">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Watch the Video
        </h2>

        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Watch this quick demo video to see how you can create, manage, and share your posts seamlessly.
        </p>

        {/* PLAY BUTTON */}
       {/* PLAY BUTTON */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
          {/* SUBTLE PULSE EFFECT */}
          <span className="
            absolute inset-0
            rounded-full
            bg-blue-400/20 dark:bg-blue-500/30
            animate-ping-slow
          "></span>

          {/* ACTUAL BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="
            relative w-full h-full
            flex items-center justify-center
            rounded-full
            bg-gradient-to-br from-blue-500 to-teal-400
            shadow-lg
            hover:shadow-2xl hover:scale-110
            transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-10 h-10 md:w-12 md:h-12 text-white"
              fill="currentColor"
            >
              <path d="M16 12v40l36-20L16 12z" />
            </svg>
          </button>
        </div>


        {/* VIDEO POPUP MODAL */}
        {open && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                w-11/12 md:w-3/4 lg:w-1/2 
                relative rounded-xl shadow-2xl 
                overflow-visible
                bg-black
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute -top-5 -right-5
                  w-12 h-12
                  flex items-center justify-center
                  text-3xl font-bold
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  rounded-full shadow-xl
                  hover:bg-red-500 hover:text-white
                  transition-all duration-200
                  z-[60]
                "
              >
                ✕
              </button>

              {/* VIDEO */}
              <iframe
                src="https://player.vimeo.com/video/93951774?autoplay=1"
                className="w-full h-64 md:h-80 lg:h-96 rounded-xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Coding Demo Vimeo"
              ></iframe>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
