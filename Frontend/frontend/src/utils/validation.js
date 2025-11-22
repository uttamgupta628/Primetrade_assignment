// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

// Task title validation
export const validateTaskTitle = (title) => {
  return title && title.trim().length >= 3;
};

// Signup form validation
export const validateSignupForm = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Login form validation
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

// Task form validation
export const validateTaskForm = (formData) => {
  const errors = {};

  if (!validateTaskTitle(formData.title)) {
    errors.title = 'Title must be at least 3 characters';
  }

  return errors;
};

// Profile form validation
export const validateProfileForm = (formData) => {
  const errors = {};

  if (formData.name && !validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
};