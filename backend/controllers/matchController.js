/**
 * Match Controller
 * Handles the matching algorithm and match requests
 * Implements intelligent matching based on multiple criteria
 */

const User = require('../models/User');

/**
 * @desc    Get suggested matches for current user
 * @route   GET /api/matches/suggestions
 * @access  Private
 */
const getSuggestedMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).lean();

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get matched user IDs to exclude them
    const matchedUserIds = currentUser.matches?.map(m => m.userId.toString()) || [];

    // Get all active users except current user and already matched users
    // Use lean() for better performance and only select needed fields
    const allUsers = await User.find({
      _id: { $ne: currentUser._id, $nin: matchedUserIds },
      isActive: true
    })
    .select('firstName lastName university degree yearOfStudy enrolledUnits academicInterests studyPreferences bio')
    .lean()
    .limit(100); // Limit initial query to 100 users for performance

    // Calculate match scores - manually implement getMatchScore since we're using lean()
    const calculateMatchScore = (user1, user2) => {
      let score = 0;

      // Common enrolled units (highest weight)
      const commonUnits = (user1.enrolledUnits || []).filter(unit =>
        (user2.enrolledUnits || []).some(ou => ou.unitCode === unit.unitCode)
      );
      score += commonUnits.length * 10;

      // Common academic interests
      const commonInterests = (user1.academicInterests || []).filter(interest =>
        (user2.academicInterests || []).includes(interest)
      );
      score += commonInterests.length * 5;

      // Study preference compatibility
      const prefs1 = user1.studyPreferences || {};
      const prefs2 = user2.studyPreferences || {};

      if (prefs1.preferredStudyMode === prefs2.preferredStudyMode ||
          prefs1.preferredStudyMode === 'flexible' ||
          prefs2.preferredStudyMode === 'flexible') {
        score += 3;
      }

      if (prefs1.groupSize === prefs2.groupSize ||
          prefs1.groupSize === 'any' ||
          prefs2.groupSize === 'any') {
        score += 2;
      }

      // Same year of study (minor bonus)
      if (user1.yearOfStudy === user2.yearOfStudy) {
        score += 1;
      }

      return score;
    };

    // Calculate match scores for all users
    const matchesWithScores = allUsers.map(user => ({
      user,
      score: calculateMatchScore(currentUser, user)
    }));

    // Filter users with score > 0 and sort by score descending
    const suggestedMatches = matchesWithScores
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // Top 20 matches
      .map(match => ({
        user: {
          id: match.user._id,
          firstName: match.user.firstName,
          lastName: match.user.lastName,
          fullName: `${match.user.firstName} ${match.user.lastName}`,
          university: match.user.university,
          degree: match.user.degree,
          yearOfStudy: match.user.yearOfStudy,
          enrolledUnits: match.user.enrolledUnits,
          academicInterests: match.user.academicInterests,
          studyPreferences: match.user.studyPreferences,
          bio: match.user.bio
        },
        matchScore: match.score,
        commonUnits: (currentUser.enrolledUnits || []).filter(unit =>
          (match.user.enrolledUnits || []).some(ou => ou.unitCode === unit.unitCode)
        ),
        commonInterests: (currentUser.academicInterests || []).filter(interest =>
          (match.user.academicInterests || []).includes(interest)
        )
      }));

    res.status(200).json({
      success: true,
      count: suggestedMatches.length,
      data: suggestedMatches
    });
  } catch (error) {
    console.error('Get suggested matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching suggested matches',
      error: error.message
    });
  }
};

/**
 * @desc    Send match request
 * @route   POST /api/matches/request
 * @access  Private
 */
const sendMatchRequest = async (req, res) => {
  try {
    const { recipientId, message } = req.body;

    if (!recipientId) {
      return res.status(400).json({
        success: false,
        message: 'Recipient ID is required'
      });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }

    // Check if already matched or request pending
    const currentUser = await User.findById(req.user.id);
    const existingMatch = currentUser.matches.find(
      match => match.userId.toString() === recipientId
    );

    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: `Match request already ${existingMatch.status}`
      });
    }

    // Add match request to current user's matches
    currentUser.matches.push({
      userId: recipientId,
      status: 'pending'
    });
    await currentUser.save();

    // Add match request to recipient's matches
    recipient.matches.push({
      userId: currentUser._id,
      status: 'pending'
    });
    await recipient.save();

    // Send real-time notification via Socket.io
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${recipientId}`).emit('new-match-request', {
        senderId: currentUser._id,
        senderName: currentUser.fullName,
        message: message || 'sent you a match request',
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match request sent successfully',
      data: {
        recipientId,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Send match request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending match request',
      error: error.message
    });
  }
};

/**
 * @desc    Accept match request
 * @route   PUT /api/matches/:matchId/accept
 * @access  Private
 */
const acceptMatchRequest = async (req, res) => {
  try {
    const { matchId } = req.params;

    const currentUser = await User.findById(req.user.id);

    // Find the match in current user's matches
    const matchIndex = currentUser.matches.findIndex(
      match => match.userId.toString() === matchId
    );

    if (matchIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Match request not found'
      });
    }

    // Update status to accepted
    currentUser.matches[matchIndex].status = 'accepted';
    await currentUser.save();

    // Update status in the other user's matches as well
    const otherUser = await User.findById(matchId);
    const otherMatchIndex = otherUser.matches.findIndex(
      match => match.userId.toString() === currentUser._id.toString()
    );

    if (otherMatchIndex !== -1) {
      otherUser.matches[otherMatchIndex].status = 'accepted';
      await otherUser.save();
    }

    // Send real-time notification
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${matchId}`).emit('match-accepted', {
        userId: currentUser._id,
        userName: currentUser.fullName,
        message: `${currentUser.fullName} accepted your match request`,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match request accepted',
      data: {
        matchId,
        status: 'accepted'
      }
    });
  } catch (error) {
    console.error('Accept match request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error accepting match request',
      error: error.message
    });
  }
};

/**
 * @desc    Decline match request
 * @route   PUT /api/matches/:matchId/decline
 * @access  Private
 */
const declineMatchRequest = async (req, res) => {
  try {
    const { matchId } = req.params;

    const currentUser = await User.findById(req.user.id);

    // Find the match in current user's matches
    const matchIndex = currentUser.matches.findIndex(
      match => match.userId.toString() === matchId
    );

    if (matchIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Match request not found'
      });
    }

    // Update status to declined
    currentUser.matches[matchIndex].status = 'declined';
    await currentUser.save();

    // Update status in the other user's matches as well
    const otherUser = await User.findById(matchId);
    const otherMatchIndex = otherUser.matches.findIndex(
      match => match.userId.toString() === currentUser._id.toString()
    );

    if (otherMatchIndex !== -1) {
      otherUser.matches[otherMatchIndex].status = 'declined';
      await otherUser.save();
    }

    res.status(200).json({
      success: true,
      message: 'Match request declined',
      data: {
        matchId,
        status: 'declined'
      }
    });
  } catch (error) {
    console.error('Decline match request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error declining match request',
      error: error.message
    });
  }
};

/**
 * @desc    Get all matches for current user
 * @route   GET /api/matches
 * @access  Private
 */
const getMyMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id)
      .select('matches')
      .lean()
      .populate({
        path: 'matches.userId',
        select: 'firstName lastName email university degree yearOfStudy enrolledUnits studyPreferences',
        options: { lean: true }
      });

    const matches = (currentUser.matches || []).map(match => ({
      user: match.userId,
      status: match.status,
      matchedAt: match.matchedAt
    }));

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error('Get my matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message
    });
  }
};

module.exports = {
  getSuggestedMatches,
  sendMatchRequest,
  acceptMatchRequest,
  declineMatchRequest,
  getMyMatches
};
