import React from "react";

export default function Hero({ onCreateAccount, onExplorePosts }) {
  return (
    <section
      className="
        w-full
        bg-gradient-to-br from-blue-50 via-teal-50 to-green-50
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        border-b border-gray-200/50 dark:border-gray-800
        py-32 md:py-40 px-6
      "
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Share your stories.<br />
            Inspire the world.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            A clean, modern blogging platform where writers express ideas and connect with a global community.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <button
              onClick={onCreateAccount}
              className="px-8 py-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-300"
            >
              Create an Account
            </button>
            <button
              onClick={onExplorePosts}
              className="
                px-8 py-4 rounded-xl font-semibold 
                border border-gray-300 dark:border-gray-600 
                text-gray-900 dark:text-white 
                bg-white dark:bg-gray-800 
                hover:bg-gray-200 dark:hover:bg-gray-700 
                transition-all duration-300
              "
            >
              Explore Posts
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/princeincar.png"
            alt="Hero"
            className="w-full max-w-lg md:max-w-md rounded-2xl shadow-2xl dark:shadow-none object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      </div>
    </section>
  );
}
