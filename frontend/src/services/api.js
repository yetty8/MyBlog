// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const searchPosts = async (query, page = 1, limit = 10, sort = 'newest') => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { 
        q: query,
        page,
        limit,
        sort
      }
    });
    return {
      posts: response.data.posts || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      totalPages: response.data.totalPages || 1
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error; // Re-throw to handle in the component
  }
};