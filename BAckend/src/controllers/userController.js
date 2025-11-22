const User = require('../models/User');


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    // Prepare updates
    if (name) {
      updates.name = name.trim();
    }

    if (email) {
      const emailLower = email.toLowerCase();
      
      // Check if email is already in use by another user
      const existingUser = await User.findOne({ 
        email: emailLower, 
        _id: { $ne: req.userId } 
      });

      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: 'Email already in use by another account' 
        });
      }

      updates.email = emailLower;
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};