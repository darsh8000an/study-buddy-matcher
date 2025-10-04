/**
 * User Controller
 * Handles user-related operations with advanced CRUD functionality
 * Includes data validation, error handling, filtering, and soft delete
 */

const User = require('../models/User');

/**
 * @desc    Get all users with filtering and pagination
 * @route   GET /api/users
 * @access  Private
 */
const getUsers = async (req, res) => {
  try {
    const {
      university,
      yearOfStudy,
      unitCode,
      studyMode,
      groupSize,
      page = 1,
      limit = 10
    } = req.query;

    // Build query object
    const query = { isActive: true }; // Only active users (soft delete check)

    if (university) query.university = university;
    if (yearOfStudy) query.yearOfStudy = yearOfStudy;
    if (unitCode) query['enrolledUnits.unitCode'] = unitCode.toUpperCase();
    if (studyMode) query['studyPreferences.preferredStudyMode'] = studyMode;
    if (groupSize) query['studyPreferences.groupSize'] = groupSize;

    // Execute query with pagination
    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is active (soft delete check)
    if (!user.isActive) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

/**
 * @desc    Update user (with validation)
 * @route   PUT /api/users/:id
 * @access  Private
 */
const updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile or has admin rights
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates.email;
    delete updates.password;
    delete updates.isVerified;
    delete updates.loginCount;

    // Validate enrolled units if provided
    if (updates.enrolledUnits) {
      const validUnits = updates.enrolledUnits.every(
        unit => unit.unitCode && unit.unitName
      );
      if (!validUnits) {
        return res.status(400).json({
          success: false,
          message: 'Invalid unit format. Each unit must have unitCode and unitName'
        });
      }
    }

    // Validate availability if provided
    if (updates.availability) {
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const validAvailability = updates.availability.every(
        slot => validDays.includes(slot.day) && slot.timeSlots && slot.timeSlots.length > 0
      );
      if (!validAvailability) {
        return res.status(400).json({
          success: false,
          message: 'Invalid availability format'
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

/**
 * @desc    Delete user (soft delete)
 * @route   DELETE /api/users/:id
 * @access  Private
 */
const deleteUser = async (req, res) => {
  try {
    // Check if user is deleting their own profile
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this profile'
      });
    }

    // Soft delete - set isActive to false instead of removing from database
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

/**
 * @desc    Bulk update users (for batch operations)
 * @route   PUT /api/users/bulk-update
 * @access  Private (Admin only in future)
 */
const bulkUpdateUsers = async (req, res) => {
  try {
    const { userIds, updates } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of user IDs'
      });
    }

    // Prevent updating sensitive fields
    delete updates.email;
    delete updates.password;
    delete updates.isVerified;

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      updates,
      { runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Users updated successfully',
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing bulk update',
      error: error.message
    });
  }
};

/**
 * @desc    Search users by name or email
 * @route   GET /api/users/search
 * @access  Private
 */
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const users = await User.find({
      isActive: true,
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    })
      .select('firstName lastName email university degree yearOfStudy')
      .limit(20);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching users',
      error: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  bulkUpdateUsers,
  searchUsers
};
