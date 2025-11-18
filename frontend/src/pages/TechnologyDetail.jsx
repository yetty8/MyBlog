// src/pages/TechnologyDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import techData from "../data/techData";

export default function TechnologyDetail() {
  const { slug } = useParams();
  const post = techData.find((item) => item.slug === slug);

  if (!post)
    return <h2 className="text-center mt-20 text-2xl">Post Not Found</h2>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-lg leading-7 whitespace-pre-line">{post.content}</p>
    </div>
  );
}
