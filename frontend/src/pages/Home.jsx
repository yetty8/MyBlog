import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CodingShowcase from "../components/CodingShowcase";
import Footer from "../components/Footer";
import categoriesData from "../data/categoryData";
import SectionWrapper from "../components/SectionWrapper";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRefs = useRef({});

  useEffect(() => {
    categoriesData.forEach((category) => {
      categoryRefs.current[category.name] = React.createRef();
    });
  }, []);

  useEffect(() => {
    if (selectedCategory && categoryRefs.current[selectedCategory]?.current) {
      categoryRefs.current[selectedCategory].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  const handleCreateAccount = () => navigate("/register");
  const handleExplorePosts = () => {
    document
      .getElementById("Technology")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SectionWrapper index={0}>
        <Hero
          onCreateAccount={handleCreateAccount}
          onExplorePosts={handleExplorePosts}
        />
      </SectionWrapper>

      <SectionWrapper index={1}>
        <CodingShowcase />
      </SectionWrapper>

      {categoriesData.map((category, index) => {
        const isLast = index === categoriesData.length - 1;

        return (
          <SectionWrapper
            index={index + 2}
            key={category.name}
            className={isLast ? "!mb-0 pb-0" : ""}
          >
            <section
              id={category.name}
              ref={categoryRefs.current[category.name]}
              className="max-w-6xl mx-auto px-4 py-16"
            >
              <h2 className="text-4xl font-extrabold mb-10 text-gray-900 dark:text-white tracking-tight">
                {category.name}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-0">
                {category.posts.map((post, idx) => (
                  <div
                    key={post.slug || idx}
                    className="
                      rounded-2xl overflow-hidden shadow-lg
                      bg-white dark:bg-gray-900/90
                      border border-gray-200 dark:border-gray-700
                      hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-300 cursor-pointer flex flex-col
                    "
                    onClick={() =>
                      navigate(
                        `/category/${category.name.toLowerCase()}/${post.slug}`
                      )
                    }
                  >
                    <div className="overflow-hidden h-48">
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

                      <p className="text-gray-800 dark:text-gray-200 text-sm mb-4 flex-grow">
                        {post.description}
                      </p>

                      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </SectionWrapper>
        );
      })}

      <Footer />
    </div>
  );
}
