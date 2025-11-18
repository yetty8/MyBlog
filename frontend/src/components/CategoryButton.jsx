export default function CategoryButton({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full font-medium transition ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
      }`}
    >
      {category}
    </button>
  );
}
