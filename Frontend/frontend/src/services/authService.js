import { apiRequest } from './api';

// Signup new user
export const signup = async (name, email, password) => {
  const data = await apiRequest('/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });
  return data;
};

// Login user
export const login = async (email, password) => {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  return data;
};

// Store auth data in localStorage
export const storeAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get stored user data
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};