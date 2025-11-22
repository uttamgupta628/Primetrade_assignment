const Task = require('../models/Task');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const task = new Task({
      userId: req.userId,
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      priority: priority || 'medium',
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get all tasks with search and filter
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query;
    const query = { userId: req.userId };

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      query.status = status;
    }

    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'title') {
      sortOption = { title: 1 };
    } else if (sort === 'priority') {
      // Custom sort: high -> medium -> low
      sortOption = { priority: -1, createdAt: -1 };
    } else if (sort === 'status') {
      sortOption = { status: 1, createdAt: -1 };
    }

    const tasks = await Task.find(query).sort(sortOption);

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error('Get task error:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const updates = { updatedAt: Date.now() };

    // Only update fields that are provided
    if (title) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (status) updates.status = status;
    if (priority) updates.priority = priority;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      taskId: task._id,
    });
  } catch (error) {
    console.error('Delete task error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        byStatus: stats,
        byPriority: priorityStats,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};