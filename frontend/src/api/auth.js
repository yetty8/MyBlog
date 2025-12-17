// frontend/src/api/auth.js
import api from './axios';

// Helper function to check token validity
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  if (!isTokenValid()) {
    localStorage.removeItem('token');
    throw new Error('Session expired. Please log in again.');
  }

  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Failed to fetch user data.';
    throw new Error(errorMessage);
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token');
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    }
  } catch (error) {
    localStorage.removeItem('token');
    throw new Error('Session expired. Please log in again.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};