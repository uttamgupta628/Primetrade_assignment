// Validation middleware for different routes

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string') {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }
  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ 
      success: false,
      message: 'Title is required' 
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({ 
      success: false,
      message: 'Title must be at least 3 characters' 
    });
  }

  next();
};

const validateTaskUpdate = (req, res, next) => {
  const { title, status, priority } = req.body;
  const errors = [];

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 3) {
      errors.push('Title must be at least 3 characters');
    }
  }

  // Validate status if provided
  if (status !== undefined) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      errors.push('Invalid status. Must be: pending, in-progress, or completed');
    }
  }

  // Validate priority if provided
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push('Invalid priority. Must be: low, medium, or high');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateProfileUpdate = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
  }

  // Validate email if provided
  if (email !== undefined) {
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Valid email is required');
    }
  }

  // At least one field must be provided
  if (name === undefined && email === undefined) {
    errors.push('At least one field (name or email) must be provided');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateTask,
  validateTaskUpdate,
  validateProfileUpdate,
};