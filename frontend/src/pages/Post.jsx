import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import categoriesData from "../data/categoryData";
import { motion } from "framer-motion";

export default function Post() {
  const { category, slug } = useParams();
  console.log("Current category:", category, "Looking for slug:", slug);

  // Find the category by slug
  const currentCategory = categoriesData.find(
    (c) => c.slug.toLowerCase() === category?.toLowerCase()
  );
  console.log("Found category:", currentCategory?.name);

  // If we have a category, find the post
  const post = currentCategory?.posts?.find((p) => p.slug === slug);
  console.log("Found post:", post?.title);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <p className="text-xl mb-6">Post not found.</p>
        <Link
          to={currentCategory ? `/category/${currentCategory.slug}` : "/"}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          {currentCategory ? `Back to ${currentCategory.name}` : "Back to Home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to={`/category/${currentCategory?.slug || ''}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to {currentCategory?.name || 'Category'}
        </Link>

        {post.image && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.jpg';
              }}
            />
          </motion.div>
        )}

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8"
        >
          <div className="flex items-center gap-2">
            <span>{post.date || 'No date'}</span>
          </div>
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <p className="text-lg mb-6">{post.description}</p>
          {post.content && post.content.split("\n").map((line, idx) =>
            line.trim() ? <p key={idx}>{line}</p> : <br key={idx} />
          )}
        </motion.div>
      </div>
    </div>
  );
}