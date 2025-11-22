const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Add user id to request
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }
    return res.status(401).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
};

module.exports = authMiddleware;