// src/pages/LifestyleDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import lifestylePosts from "../data/LifestyleData";
import { FaArrowLeft } from "react-icons/fa";

export default function LifestyleDetail() {
  const { slug } = useParams();
  const post = lifestylePosts.find((p) => p.slug === slug);

  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <Link
        to="/lifestyle"
        className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:underline"
      >
        <FaArrowLeft /> Back to Lifestyle
      </Link>

      {post.image && (
        <div className="mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="prose prose-lg dark:prose-invert mb-10">
        <p>{post.description}</p>
      </div>
    </div>
  );
}
