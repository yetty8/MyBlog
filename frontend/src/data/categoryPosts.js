// src/pages/CategoryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import techData from "../data/techData";
import travelData from "../data/travelData";
import lifestyleData from "../data/lifestyleData";
import educationData from "../data/educationData";
import businessData from "../data/businessData";

const categoryMap = {
  technology: { title: "Technology", description: "Latest trends, tutorials, and guides in tech.", posts: techData },
  lifestyle: { title: "Lifestyle", description: "Wellness, habits, and daily life improvements.", posts: lifestyleData },
  education: { title: "Education", description: "Skills, learning guides, and academic insights.", posts: educationData },
  business: { title: "Business", description: "Entrepreneurship, finance, and productivity tips.", posts: businessData },
  travel: { title: "Travel", description: "Travel guides, tips, and adventures worldwide.", posts: travelData },
};

export default function CategoryPage() {
  const { category } = useParams();
  const data = categoryMap[category.toLowerCase()];

  if (!data) return <h2 className="text-center text-2xl mt-20">Category not found.</h2>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title + Description */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 dark:text-white">{data.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{data.description}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {data.posts.map((post) => (
          <Link
            key={post.id || post.slug}
            to={`/category/${category}/${post.id || post.slug}`}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{post.description}</p>
              <span className="text-blue-600 font-semibold hover:underline">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
