import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import CategoryButton from "./CategoryButton";

export default function Navbar({ selectedCategory, setSelectedCategory }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ["Technology", "Lifestyle", "Education", "Business", "Travel"];

  const DarkModeButton = () => {
    const circleSize = 20;
    const buttonWidth = 48;
    const padding = 2;
    const maxX = buttonWidth - circleSize - padding * 2;

    return (
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center justify-start w-12 h-6 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-600 shadow-inner px-1"
      >
        <motion.div
          layout
          animate={{ x: theme === 'light' ? 0 : maxX }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
        >
          {theme === "light" ? <FaMoon className="text-gray-800 text-sm" /> : <FaSun className="text-yellow-500 text-sm" />}
        </motion.div>
      </motion.button>
    );
  };

  // Handle category click
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    navigate(`/${cat.toLowerCase()}`); // Navigate to /technology, /lifestyle, etc.
    setMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/60 shadow-sm border-b border-white/20 dark:border-gray-700/40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {categories.map((cat) => (
           <CategoryButton
              key={cat}
              category={cat}
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}

          <Link
            to="#"
            onClick={() => scrollToTop()}
            className="px-4 py-2 rounded-full border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white transition font-medium no-underline"
          >
            Home
          </Link>

          <DarkModeButton />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl dark:text-white" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl p-6 flex flex-col gap-6 z-50"
        >
          <button className="text-2xl self-end dark:text-white" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>

          {categories.map((cat) => (
           <CategoryButton
              key={cat}
              category={cat}
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}

         <Link
          to="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
          className="px-4 py-2 rounded-full border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white transition font-medium"
        >
          Home
        </Link>

          <DarkModeButton />
        </motion.div>
      )}
    </nav>
  );
}
