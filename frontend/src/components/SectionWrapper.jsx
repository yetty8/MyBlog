import React from "react";

export default function SectionWrapper({ children, index }) {
  // Alternating gradient backgrounds
  const gradients = [
    "from-blue-50 via-teal-50 to-green-50",
    "from-purple-50 via-pink-50 to-red-50",
    "from-yellow-50 via-orange-50 to-amber-50",
    "from-sky-50 via-blue-50 to-indigo-50",
    "from-emerald-50 via-green-50 to-lime-50",
  ];

  const bg = gradients[index % gradients.length];

  return (
    <section
      className={`
        py-16 
        bg-gradient-to-br ${bg}
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        transition-all duration-300
      `}
    >
      <div className="max-w-6xl mx-auto px-4">{children}</div>
    </section>
  );
}
