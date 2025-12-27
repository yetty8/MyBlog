// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Search posts
export const searchPosts = async (query, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { 
        q: query,
        page,
        limit
      }
    });
    return {
      posts: response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      totalPages: response.data.totalPages || 1
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, limit }
    });
    return {
      posts: response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      totalPages: response.data.totalPages || 1
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};