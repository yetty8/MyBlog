import { useParams, Link } from "react-router-dom";
import categories from "../data/categoryData";

export default function PostPage() {
  const { category, postSlug } = useParams();

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

  const post = categoryData.posts.find((p) => p.slug === postSlug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <p className="text-gray-900 dark:text-white text-xl mb-4">
          Post not found.
        </p>
        <Link
          to={`/category/${category}`}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Back to {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Link
        to={`/category/${category}`}
        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-6 inline-block"
      >
        ← Back to {category.charAt(0).toUpperCase() + category.slice(1)}
      </Link>

      <h1 className="text-4xl font-extrabold mb-6">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-80 object-cover rounded-xl mb-6 shadow-lg"
      />
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
       The Power of Persistence: Why Motivation is Just the Beginning

Motivation is a spark. It’s that little voice that whispers, “You can do this” when life feels heavy. But motivation alone isn’t enough—it fades, sometimes as quickly as it appears. The real magic lies in persistence: the quiet determination to keep moving forward, even when the world seems against you.

1. Start Small, Dream Big

Every journey begins with a single step. It doesn’t matter how tiny it is, as long as it’s in the right direction. Small actions accumulate. Reading for 20 minutes a day, exercising for 15 minutes, or learning a new skill bit by bit can transform your life over time. Remember, even the tallest oak tree was once just a seed.

2. Embrace Failure as Feedback

Failure isn’t the opposite of success—it’s part of it. Every mistake teaches you something invaluable. Thomas Edison failed thousands of times before inventing the lightbulb, but he never saw it as failure. He saw it as discovering thousands of ways that wouldn’t work. When you change your perspective, setbacks become stepping stones.

3. Surround Yourself with Positivity

Energy is contagious. Surround yourself with people who uplift you, inspire you, and challenge you to grow. Avoid those who drain your spirit or constantly focus on the negative. A supportive environment fuels persistence when motivation wanes.

4. Celebrate Progress, Not Perfection

Perfection is an illusion that can paralyze action. Instead, celebrate small wins and milestones. Every step forward, no matter how small, is progress. Give yourself credit for showing up and putting in the effort. Your journey is yours alone—embrace it.

5. Keep Your “Why” in Focus

Your why is the fuel for your fire. Why are you pursuing this goal? What vision keeps you awake with excitement? On tough days, remembering your purpose can reignite your drive. Motivation may fluctuate, but a strong “why” keeps you moving.
      </p>
    </div>
  );
}
