// In SectionWrapper.jsx
import React, { forwardRef } from 'react';

const SectionWrapper = forwardRef(({ children, index, className = '', ...props }, ref) => {
  const gradients = [
    'from-blue-50 to-indigo-100',
    'from-white to-gray-50',
    'from-gray-50 to-blue-50',
  ];

  const bg = gradients[index % gradients.length];

  return (
    <section
      ref={ref}
      className={`
        py-16 
        bg-gradient-to-br ${bg}
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </section>
  );
});

export default SectionWrapper;