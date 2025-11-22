const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');

// Apply auth middleware to all task routes
router.use(authMiddleware);

// @route   GET /api/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', getTaskStats);

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', validateTask, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks with filters
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', validateTaskUpdate, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;