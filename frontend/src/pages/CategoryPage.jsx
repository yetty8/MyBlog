import { useParams, Link, useNavigate } from "react-router-dom";
import categories from "../data/categoryData";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryData = categories.find(
    (c) => c.name.toLowerCase() === category
  );

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <p className="text-gray-900 dark:text-white text-xl mb-4">
          Category not found.
        </p>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100 dark:bg-gray-900">
     

      <h1 className="text-5xl font-extrabold mb-12 text-gray-900 dark:text-white">
        {categoryData.name}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {categoryData.posts.map((post) => (
          <div
            key={post.slug}
            onClick={() =>
              navigate(`/category/${categoryData.name.toLowerCase()}/${post.slug}`)
            }
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
          </div>
        ))}
      </div>
    </section>
  );
}
