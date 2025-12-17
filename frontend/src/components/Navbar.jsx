import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const categories = ["Technology", "Lifestyle", "Education", "Business", "Travel"];

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' 
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 group"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MyBlog
                </span>
              </Link>
              
              <div className="hidden md:ml-10 md:flex md:space-x-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors
                      text-gray-700 dark:text-gray-300 
                      hover:text-blue-600 dark:hover:text-blue-400
                      hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full focus:outline-none 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <FaSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user?.username || 'User'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <button
                        onClick={logoutUser}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors
                      text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white
                      bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                      transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <FaBars className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
                {categories.map((category) => (
                  <Link
                    key={`mobile-${category}`}
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-3 py-2 rounded-md text-base font-medium 
                      text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                      hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  >
                    {category}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium 
                        text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                        hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium 
                        text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;