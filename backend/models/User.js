/**
 * User Model
 * Defines the schema for user data in the database
 * Includes authentication, profile, and matching preferences
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  // Authentication fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },

  // Profile Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  university: {
    type: String,
    required: [true, 'University is required'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Degree/Program is required'],
    trim: true
  },
  yearOfStudy: {
    type: Number,
    required: [true, 'Year of study is required'],
    min: 1,
    max: 6
  },

  // Academic Interests
  enrolledUnits: [{
    unitCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    unitName: {
      type: String,
      required: true,
      trim: true
    }
  }],
  academicInterests: [{
    type: String,
    trim: true
  }],

  // Study Preferences
  studyPreferences: {
    preferredStudyMode: {
      type: String,
      enum: ['online', 'in-person', 'hybrid', 'flexible'],
      default: 'flexible'
    },
    groupSize: {
      type: String,
      enum: ['one-on-one', 'small-group', 'large-group', 'any'],
      default: 'any'
    },
    studyStyle: {
      type: String,
      enum: ['discussion-based', 'task-oriented', 'mixed'],
      default: 'mixed'
    },
    languagePreference: {
      type: String,
      default: 'English'
    }
  },

  // Availability
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    timeSlots: [{
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }]
  }],

  // Profile Details
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    trim: true
  },
  profilePicture: {
    type: String,
    default: 'default-avatar.png'
  },

  // Matching Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  // Matches and Connections
  matches: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    matchedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Analytics
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to check if user matches with another based on common units
UserSchema.methods.getMatchScore = function(otherUser) {
  let score = 0;

  // Common enrolled units (highest weight)
  const commonUnits = this.enrolledUnits.filter(unit =>
    otherUser.enrolledUnits.some(ou => ou.unitCode === unit.unitCode)
  );
  score += commonUnits.length * 10;

  // Common academic interests
  const commonInterests = this.academicInterests.filter(interest =>
    otherUser.academicInterests.includes(interest)
  );
  score += commonInterests.length * 5;

  // Study preference compatibility
  if (this.studyPreferences.preferredStudyMode === otherUser.studyPreferences.preferredStudyMode ||
      this.studyPreferences.preferredStudyMode === 'flexible' ||
      otherUser.studyPreferences.preferredStudyMode === 'flexible') {
    score += 3;
  }

  if (this.studyPreferences.groupSize === otherUser.studyPreferences.groupSize ||
      this.studyPreferences.groupSize === 'any' ||
      otherUser.studyPreferences.groupSize === 'any') {
    score += 2;
  }

  // Same year of study (minor bonus)
  if (this.yearOfStudy === otherUser.yearOfStudy) {
    score += 1;
  }

  return score;
};

// Index for efficient searching
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ 'enrolledUnits.unitCode': 1 });
UserSchema.index({ university: 1, yearOfStudy: 1 });

module.exports = mongoose.model('User', UserSchema);
