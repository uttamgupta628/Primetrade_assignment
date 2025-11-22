// API configuration and axios instance
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {}, requiresAuth = false } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add authorization header if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Add body for POST/PUT/PATCH requests
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export { API_BASE_URL, getAuthToken, apiRequest };