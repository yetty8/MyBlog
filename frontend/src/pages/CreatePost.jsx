import React, { useState } from "react";

export default function CodingShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="
        py-20 px-6 
        bg-gradient-to-br from-blue-50 via-teal-50 to-green-50
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        border-t border-gray-200/50 dark:border-gray-800
      "
    >
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Watch How Coding Comes to Life
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A short demo showing the creation of clean, modern, and responsive web components.
        </p>

        {/* WATCH VIDEO BUTTON */}
    {/* PLAY BUTTON */}
<div className="flex justify-center">
  <button
    onClick={() => setOpen(true)}
    className="
      w-20 h-20 flex items-center justify-center
      bg-gradient-to-r from-blue-500 via-teal-400 to-green-400
      text-white text-3xl font-bold rounded-full
      shadow-lg hover:shadow-2xl hover:scale-110 transform transition-all duration-300
      focus:outline-none focus:ring-4 focus:ring-blue-300
    "
  >
    ▶
  </button>
</div>


        {/* VIDEO POPUP */}
        {open && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-11/12 md:w-3/4 lg:w-1/2 relative animate-popup"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute -top-6 right-0 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                  w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-110 hover:bg-red-500 hover:text-white
                  transition-transform transition-colors duration-200
                  z-50
                "
              >
                ✕
              </button>

              <iframe
                src="https://player.vimeo.com/video/93951774?autoplay=1"
                className="w-full h-64 md:h-96 rounded-xl shadow-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Coding Demo Vimeo"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
