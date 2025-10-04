/**
 * User Routes
 * Defines API endpoints for user operations
 */

const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  bulkUpdateUsers,
  searchUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Search route (must be before /:id route)
router.get('/search', searchUsers);

// Bulk operations
router.put('/bulk-update', bulkUpdateUsers);

// Standard CRUD
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
