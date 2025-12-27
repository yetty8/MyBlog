// src/components/ui/Image.jsx
import { useState } from 'react';

const Image = ({ 
  src, 
  alt, 
  width,
  height,
  className = '',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${width}/${height}` }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};

export default Image;