// src/pages/SearchResults.jsx
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaSpinner, FaTimes } from 'react-icons/fa';
import { searchPosts } from '../services/api';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Update search when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);

    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    } else {
      setResults([]);
    }
  }, [location.search]);

  const performSearch = async (searchTerm, page = 1) => {
  if (!searchTerm.trim()) return;
  
  try {
    setIsLoading(true);
    setError(null);
    const data = await searchPosts(searchTerm, page);
    setResults(data.posts);
    setPagination({
      ...pagination,
      page: data.page,
      total: data.total,
      totalPages: data.totalPages
    });
  } catch (err) {
    console.error('Search error:', err);
    setError('Failed to fetch search results. Please try again later.');
  } finally {
    setIsLoading(false);
  }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = query.trim();
    if (searchTerm) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { replace: true });
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    navigate('/search', { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {query ? `Search Results for "${query}"` : 'Search Posts'}
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search posts by title, category, or content..."
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin h-4 w-4" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        <div className="space-y-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="space-y-6">
                {results.map((post) => (
                  <motion.article
                    key={post._id || post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {post.category}
                        </span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.createdAt || post.date}>
                          {new Date(post.createdAt || post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        <Link
                          to={`/post/${post.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 200) + '...'}
                      </p>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        <Link
                          to={`/post/${post.slug}`}
                          className="text-sm font-medium inline-flex items-center group"
                        >
                          Read more
                          <FaArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={12} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-md ${
                          pagination.page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : query ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No results found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                We couldn't find any posts matching <span className="font-medium">"{query}"</span>. Try different keywords.
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Start searching
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Enter keywords in the search box above to find posts.
              </p>
              <div className="mt-6 max-w-md mx-auto text-left bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Search tips:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Try different keywords or search terms</li>
                  <li>• Check your spelling</li>
                  <li>• Use more general terms</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;