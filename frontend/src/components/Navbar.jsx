import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { useState, useEffect, useCallback, useRef } from 'react';
import { searchPosts } from '../services/api'; // You'll need to create this

const categories = ['Technology', 'Lifestyle', 'Education', 'Business', 'Travel'];

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce search function
  useEffect(() => {
    const searchDelay = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const results = await searchPosts(searchQuery.trim());
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(searchDelay);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      setShowResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('q');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow'
            : 'bg-white dark:bg-gray-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MyBlog
              </span>
            </Link>

            {/* Desktop Categories */}
            <div className="hidden md:flex items-center space-x-6">
              {categories.map((category) => {
                const path = `/category/${category.toLowerCase()}`;
                const active = isActive(path);

                return (
                  <Link
                    key={category}
                    to={path}
                    className={`relative text-sm font-medium transition ${
                      active
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {category}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search (desktop) */}
              <div ref={searchRef} className="relative hidden md:block">
                <form 
                  onSubmit={handleSearch}
                  className={`relative flex items-center transition-all duration-200 ${
                    isSearchFocused || searchQuery
                      ? 'bg-white dark:bg-gray-800 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800'
                  } rounded-full px-3 py-1.5`}
                >
                  <FaSearch className="text-gray-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowResults(!!searchQuery.trim());
                    }}
                    onBlur={() => {
                      // Small delay to allow clicking on results
                      setTimeout(() => setShowResults(false), 200);
                    }}
                    className="bg-transparent outline-none px-2 py-1 text-sm w-48 focus:w-64 transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      <FaTimesCircle className="w-4 h-4" />
                    </button>
                  )}
                  {isSearching && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>
                  )}
                </form>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((post) => (
                      <Link
                        key={post.id}
                        to={`/post/${post.slug}`}
                        className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setShowResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hi, {user?.username}
                  </span>
                  <button
                    onClick={logoutUser}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link to="/login" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
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
              className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="w-full">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md px-3">
                    <FaSearch className="text-gray-500 text-sm" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setShowResults(!!searchQuery.trim())}
                      onBlur={() => setTimeout(() => setShowResults(false), 200)}
                      className="bg-transparent outline-none px-2 py-2 text-sm w-full"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        <FaTimesCircle className="w-4 h-4" />
                      </button>
                    )}
                    {isSearching && (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>
                    )}
                  </div>
                  
                  {/* Mobile Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                      {searchResults.map((post) => (
                        <Link
                          key={`mobile-${post.id}`}
                          to={`/post/${post.slug}`}
                          className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => {
                            setShowResults(false);
                            setSearchQuery('');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </form>

                {/* Mobile Categories */}
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={`mobile-${category}`}
                      to={`/category/${category.toLowerCase()}`}
                      className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                        Hi, {user?.username}
                      </div>
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-3 py-2 text-white rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;