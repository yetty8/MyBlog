import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryPage({ category }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/posts");
        // Filter posts by category
        const filtered = res.data.filter((p) => p.category === category);
        setPosts(filtered);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">{category} Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found in {category}.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
            >
              <img
                src={post.image || "https://via.placeholder.com/600x400"}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {post.content?.slice(0, 100)}...
                </p>
                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
