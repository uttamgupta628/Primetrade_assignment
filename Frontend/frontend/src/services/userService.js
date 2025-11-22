import { apiRequest } from './api';

// Get user profile
export const getProfile = async () => {
  const data = await apiRequest('/user/profile', {
    requiresAuth: true,
  });
  return data;
};

// Update user profile
export const updateProfile = async (updates) => {
  const data = await apiRequest('/user/profile', {
    method: 'PUT',
    body: updates,
    requiresAuth: true,
  });
  return data;
};