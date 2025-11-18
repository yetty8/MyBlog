// src/pages/Post.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaRegClock, FaTags } from "react-icons/fa";
import categoriesData from "../data/categoryData";

export default function Post() {
  const { category, slug } = useParams();

  // Find the category
  const currentCategory = categoriesData.find(
    (c) => c.name.toLowerCase() === category.toLowerCase()
  );

  // Find the post
  const post = currentCategory?.posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl mb-4">Post not found.</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:underline font-semibold"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Post Image */}
        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        )}

        {/* Post Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>

        {/* Post Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
          <div className="flex items-center gap-1">
            <FaRegClock />
            <span>{post.createdAt}</span>
          </div>
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <FaTags />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert mb-12 max-w-none">
          {post.content.split("\n").map((line, idx) =>
            line.trim() ? <p key={idx}>{line}</p> : <br key={idx} />
          )}
        </div>
      </div>
    </div>
  );
}
