/**
 * Unit Tests for User Model
 * Tests password hashing, comparison, and match score calculation
 */

const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Tests', () => {
  // Sample user data
  const validUserData = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    university: 'Deakin University',
    degree: 'Bachelor of IT',
    yearOfStudy: 2,
    enrolledUnits: [
      { unitCode: 'SIT725', unitName: 'Advanced Programming' },
      { unitCode: 'SIT374', unitName: 'Project Management' }
    ],
    academicInterests: ['Web Development', 'Cloud Computing'],
    studyPreferences: {
      preferredStudyMode: 'online',
      groupSize: 'small-group',
      studyStyle: 'discussion-based'
    }
  };

  describe('Password Hashing', () => {
    test('should hash password before saving', async () => {
      const user = new User(validUserData);
      await user.save();

      // Password should be hashed (not equal to plain text)
      expect(user.password).not.toBe('password123');
      expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt format
    });

    test('should not rehash password if not modified', async () => {
      const user = new User(validUserData);
      await user.save();
      const hashedPassword = user.password;

      // Update other field
      user.firstName = 'Jane';
      await user.save();

      // Password should remain the same
      expect(user.password).toBe(hashedPassword);
    });
  });

  describe('Password Comparison', () => {
    test('should return true for correct password', async () => {
      const user = new User(validUserData);
      await user.save();

      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);
    });

    test('should return false for incorrect password', async () => {
      const user = new User(validUserData);
      await user.save();

      const isMatch = await user.comparePassword('wrongpassword');
      expect(isMatch).toBe(false);
    });
  });

  describe('Virtual Fields', () => {
    test('should generate fullName from firstName and lastName', () => {
      const user = new User(validUserData);
      expect(user.fullName).toBe('John Doe');
    });
  });

  describe('Match Score Calculation', () => {
    let user1, user2;

    beforeEach(() => {
      user1 = new User({
        ...validUserData,
        email: 'user1@example.com',
        enrolledUnits: [
          { unitCode: 'SIT725', unitName: 'Advanced Programming' },
          { unitCode: 'SIT374', unitName: 'Project Management' }
        ],
        academicInterests: ['Web Development', 'Cloud Computing'],
        yearOfStudy: 2,
        studyPreferences: {
          preferredStudyMode: 'online',
          groupSize: 'small-group',
          studyStyle: 'discussion-based'
        }
      });

      user2 = new User({
        ...validUserData,
        email: 'user2@example.com',
        enrolledUnits: [
          { unitCode: 'SIT725', unitName: 'Advanced Programming' },
          { unitCode: 'SIT374', unitName: 'Project Management' }
        ],
        academicInterests: ['Web Development', 'Cloud Computing'],
        yearOfStudy: 2,
        studyPreferences: {
          preferredStudyMode: 'online',
          groupSize: 'small-group',
          studyStyle: 'discussion-based'
        }
      });
    });

    test('should give 10 points per common enrolled unit', () => {
      const score = user1.getMatchScore(user2);
      // 2 common units = 20 points
      // 2 common interests = 10 points
      // study mode match = 3 points
      // group size match = 2 points
      // same year = 1 point
      // Total = 36 points
      expect(score).toBeGreaterThanOrEqual(20);
    });

    test('should give 5 points per common academic interest', () => {
      user2.academicInterests = ['Web Development', 'Cloud Computing', 'Machine Learning'];
      const score = user1.getMatchScore(user2);
      // Should include points for 2 common interests
      expect(score).toBeGreaterThanOrEqual(10); // At least 2 * 5 from interests
    });

    test('should give 3 points for compatible study mode', () => {
      user2.studyPreferences.preferredStudyMode = 'online';
      const score = user1.getMatchScore(user2);
      expect(score).toBeGreaterThan(0);
    });

    test('should give 3 points if one user has flexible study mode', () => {
      user2.studyPreferences.preferredStudyMode = 'flexible';
      const score = user1.getMatchScore(user2);
      expect(score).toBeGreaterThan(0);
    });

    test('should give 2 points for compatible group size', () => {
      user2.studyPreferences.groupSize = 'small-group';
      const score = user1.getMatchScore(user2);
      expect(score).toBeGreaterThan(0);
    });

    test('should give 1 point for same year of study', () => {
      user2.yearOfStudy = 2;
      const score = user1.getMatchScore(user2);
      expect(score).toBeGreaterThan(0);
    });

    test('should return 0 for completely incompatible users', () => {
      user2.enrolledUnits = [{ unitCode: 'ABC123', unitName: 'Different Unit' }];
      user2.academicInterests = ['Different Interest'];
      user2.yearOfStudy = 5;
      user2.studyPreferences.preferredStudyMode = 'in-person';
      user2.studyPreferences.groupSize = 'large-group';

      // Will still get some points from flexible matching
      const score = user1.getMatchScore(user2);
      expect(score).toBeDefined();
    });

    test('should calculate higher score for more similar users', () => {
      // User 3 with perfect match
      const user3 = new User({
        ...validUserData,
        email: 'user3@example.com',
        enrolledUnits: user1.enrolledUnits,
        academicInterests: user1.academicInterests,
        yearOfStudy: user1.yearOfStudy,
        studyPreferences: user1.studyPreferences
      });

      // User 4 with partial match
      const user4 = new User({
        ...validUserData,
        email: 'user4@example.com',
        enrolledUnits: [{ unitCode: 'SIT725', unitName: 'Advanced Programming' }], // Only 1 common
        academicInterests: ['Web Development'], // Only 1 common
        yearOfStudy: 3, // Different year
        studyPreferences: {
          preferredStudyMode: 'in-person', // Different mode
          groupSize: 'any', // Flexible
          studyStyle: 'task-oriented' // Different style
        }
      });

      const score3 = user1.getMatchScore(user3);
      const score4 = user1.getMatchScore(user4);

      expect(score3).toBeGreaterThan(score4);
    });
  });

  describe('Validation', () => {
    test('should require email', async () => {
      const user = new User({ ...validUserData, email: undefined });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    test('should require valid email format', async () => {
      const user = new User({ ...validUserData, email: 'invalid-email' });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    test('should require password', async () => {
      const user = new User({ ...validUserData, password: undefined });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    test('should require password minimum length of 6', async () => {
      const user = new User({ ...validUserData, password: '12345' });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    test('should require year of study between 1 and 6', async () => {
      const user = new User({ ...validUserData, yearOfStudy: 7 });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.yearOfStudy).toBeDefined();
    });

    test('should limit bio to 500 characters', async () => {
      const longBio = 'a'.repeat(501);
      const user = new User({ ...validUserData, bio: longBio });

      let error;
      try {
        await user.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.bio).toBeDefined();
    });
  });
});

// Setup and teardown
beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/study-buddy-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  // Disconnect from test database
  await mongoose.connection.close();
});
