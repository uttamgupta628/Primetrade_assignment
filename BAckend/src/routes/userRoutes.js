const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../middleware/validation');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, getProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, validateProfileUpdate, updateProfile);

module.exports = router;