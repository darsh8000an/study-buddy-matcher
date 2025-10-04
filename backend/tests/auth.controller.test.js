const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Auth Controller Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/study-buddy-test');
  });

  afterAll(async () => {
    // Clean up and close connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear users before each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.firstName).toBe(userData.firstName);
      expect(response.body.data.token).toBeDefined();
    });

    test('should fail with missing required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should fail with duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      };

      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Duplicate registration
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });

    test('should hash password before saving', async () => {
      const userData = {
        email: 'hash@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const user = await User.findOne({ email: userData.email });
      expect(user.password).not.toBe(userData.password);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await User.create({
        email: 'login@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      });
    });

    test('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('login@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    test('should fail with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should fail with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should fail with missing credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken;
    let userId;

    beforeEach(async () => {
      // Register and login to get token
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'me@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 2
        });

      authToken = registerResponse.body.data.token;
      userId = registerResponse.body.data.user._id;
    });

    test('should get current user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(userId);
      expect(response.body.data.email).toBe('me@example.com');
    });

    test('should fail without auth token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should fail with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/auth/profile', () => {
    let authToken;

    beforeEach(async () => {
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'profile@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 2
        });

      authToken = registerResponse.body.data.token;
    });

    test('should update profile successfully', async () => {
      const updates = {
        bio: 'Updated bio',
        academicInterests: ['Web Development', 'Data Science']
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.bio).toBe(updates.bio);
      expect(response.body.data.academicInterests).toEqual(updates.academicInterests);
    });

    test('should not allow email update', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'newemail@example.com' })
        .expect(200);

      expect(response.body.data.email).toBe('profile@example.com');
    });
  });

  describe('PUT /api/auth/password', () => {
    let authToken;

    beforeEach(async () => {
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'password@example.com',
          password: 'oldpassword123',
          firstName: 'John',
          lastName: 'Doe',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 2
        });

      authToken = registerResponse.body.data.token;
    });

    test('should update password successfully', async () => {
      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'oldpassword123',
          newPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);

      // Try logging in with new password
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'password@example.com',
          password: 'newpassword123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
    });

    test('should fail with incorrect current password', async () => {
      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
