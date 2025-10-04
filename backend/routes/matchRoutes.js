/**
 * Match Routes
 * Defines API endpoints for matching operations
 */

const express = require('express');
const {
  getSuggestedMatches,
  sendMatchRequest,
  acceptMatchRequest,
  declineMatchRequest,
  getMyMatches
} = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Get suggested matches
router.get('/suggestions', getSuggestedMatches);

// Get user's matches
router.get('/', getMyMatches);

// Send match request
router.post('/request', sendMatchRequest);

// Accept/Decline match request
router.put('/:matchId/accept', acceptMatchRequest);
router.put('/:matchId/decline', declineMatchRequest);

module.exports = router;
