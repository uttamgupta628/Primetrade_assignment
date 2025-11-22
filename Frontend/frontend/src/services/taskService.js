import { apiRequest } from './api';

// Get all tasks with optional filters
export const getTasks = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.status) queryParams.append('status', filters.status);
  if (filters.priority) queryParams.append('priority', filters.priority);
  if (filters.sort) queryParams.append('sort', filters.sort);

  const queryString = queryParams.toString();
  const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;

  const data = await apiRequest(endpoint, {
    requiresAuth: true,
  });
  return data;
};

// Get single task by ID
export const getTaskById = async (id) => {
  const data = await apiRequest(`/tasks/${id}`, {
    requiresAuth: true,
  });
  return data;
};

// Create new task
export const createTask = async (taskData) => {
  const data = await apiRequest('/tasks', {
    method: 'POST',
    body: taskData,
    requiresAuth: true,
  });
  return data;
};

// Update task
export const updateTask = async (id, updates) => {
  const data = await apiRequest(`/tasks/${id}`, {
    method: 'PUT',
    body: updates,
    requiresAuth: true,
  });
  return data;
};

// Delete task
export const deleteTask = async (id) => {
  const data = await apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
  return data;
};

// Get task statistics
export const getTaskStats = async () => {
  const data = await apiRequest('/tasks/stats', {
    requiresAuth: true,
  });
  return data;
};