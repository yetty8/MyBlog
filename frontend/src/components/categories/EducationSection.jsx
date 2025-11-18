import React from "react";
import { Link } from "react-router-dom";
import educationPosts from "../../data/educationData";

export default function EducationSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-900 dark:text-white">
        Education
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {educationPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/category/education/${post.slug}`}
            className="
              rounded-2xl overflow-hidden shadow-lg
              bg-white dark:bg-gray-900/90
              border border-gray-200 dark:border-gray-700
              hover:shadow-2xl hover:-translate-y-2
              transition-all duration-300 cursor-pointer flex flex-col
            "
          >
            <div className="h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-sm flex-grow">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
