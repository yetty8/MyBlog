// src/components/CodingShowcase.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from '../utils/analytics';

export default function CodingShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Track when the video is viewed in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent({
            action: 'view',
            category: 'Video',
            label: 'Video Section Viewed'
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#video-showcase');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handlePlay = () => {
    if (!hasPlayed) {
      trackEvent({
        action: 'play',
        category: 'Video',
        label: 'Video Play Button Clicked'
      });
      setHasPlayed(true);
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    trackEvent({
      action: 'close',
      category: 'Video',
      label: 'Video Modal Closed'
    });
    setIsOpen(false);
  };

  const handleVideoEnd = () => {
    trackEvent({
      action: 'complete',
      category: 'Video',
      label: 'Video Watched to Completion'
    });
  };

  return (
    <section 
      id="video-showcase" 
      className="w-full bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-black border-t border-gray-200/50 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Watch the Video
        </h2>

        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Watch this quick demo video to see how you can create, manage, and share your posts seamlessly.
        </p>

        <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-500/30 animate-ping-slow"></span>

          <button
            onClick={handlePlay}
            className="
              relative w-full h-full
              flex items-center justify-center
              rounded-full
              bg-gradient-to-br from-blue-500 to-teal-400
              shadow-lg
              hover:shadow-2xl hover:scale-110
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-blue-300
              group
            "
            aria-label="Play video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
            >
              <path d="M16 12v40l36-20L16 12z" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Video modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
              className="
                w-full max-w-4xl
                relative rounded-xl shadow-2xl 
                overflow-hidden
                bg-black
                aspect-video
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="
                  absolute -top-4 -right-4
                  w-10 h-10
                  flex items-center justify-center
                  text-2xl font-bold
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  rounded-full shadow-xl
                  hover:bg-red-500 hover:text-white
                  transition-all duration-200
                  z-10
                "
                aria-label="Close video"
              >
                ✕
              </button>

              <iframe
                src="https://player.vimeo.com/video/93951774?autoplay=1"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Coding Demo Vimeo"
                onEnded={handleVideoEnd}
              ></iframe>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}