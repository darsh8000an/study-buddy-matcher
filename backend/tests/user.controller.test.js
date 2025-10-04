const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('User Controller Tests', () => {
  let authToken;
  let userId;
  let adminToken;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/study-buddy-test');
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create regular user and get token
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      });

    authToken = userResponse.body.data.token;
    userId = userResponse.body.data.user._id;

    // Create admin user
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin@example.com',
        password: 'password123',
        firstName: 'Admin',
        lastName: 'User',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2,
        role: 'admin'
      });

    adminToken = adminResponse.body.data.token;
  });

  describe('GET /api/users', () => {
    beforeEach(async () => {
      // Create multiple users
      await User.create([
        {
          email: 'user1@example.com',
          password: 'password123',
          firstName: 'Alice',
          lastName: 'Smith',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 1
        },
        {
          email: 'user2@example.com',
          password: 'password123',
          firstName: 'Bob',
          lastName: 'Johnson',
          university: 'Test University',
          degree: 'Engineering',
          yearOfStudy: 2
        },
        {
          email: 'user3@example.com',
          password: 'password123',
          firstName: 'Carol',
          lastName: 'Williams',
          university: 'Other University',
          degree: 'Computer Science',
          yearOfStudy: 3
        }
      ]);
    });

    test('should get all active users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(3);
    });

    test('should filter users by university', async () => {
      const response = await request(app)
        .get('/api/users')
        .query({ university: 'Test University' })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach(user => {
        expect(user.university).toBe('Test University');
      });
    });

    test('should filter users by year of study', async () => {
      const response = await request(app)
        .get('/api/users')
        .query({ yearOfStudy: 2 })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach(user => {
        expect(user.yearOfStudy).toBe(2);
      });
    });

    test('should support pagination', async () => {
      const response = await request(app)
        .get('/api/users')
        .query({ page: 1, limit: 2 })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeLessThanOrEqual(2);
    });

    test('should fail without authentication', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/users/:id', () => {
    test('should get user by ID', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(userId);
      expect(response.body.data.email).toBe('user@example.com');
    });

    test('should fail with invalid user ID', async () => {
      const response = await request(app)
        .get('/api/users/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    test('should not return password', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.data.password).toBeUndefined();
    });
  });

  describe('GET /api/users/search', () => {
    beforeEach(async () => {
      await User.create({
        email: 'searchable@example.com',
        password: 'password123',
        firstName: 'Searchable',
        lastName: 'User',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      });
    });

    test('should search users by name', async () => {
      const response = await request(app)
        .get('/api/users/search')
        .query({ query: 'Searchable' })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.data[0].firstName).toBe('Searchable');
    });

    test('should search users by email', async () => {
      const response = await request(app)
        .get('/api/users/search')
        .query({ query: 'searchable@' })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update user successfully', async () => {
      const updates = {
        firstName: 'Updated',
        bio: 'Updated bio'
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe('Updated');
      expect(response.body.data.bio).toBe('Updated bio');
    });

    test('should fail to update other user without admin role', async () => {
      const otherUser = await User.create({
        email: 'other@example.com',
        password: 'password123',
        firstName: 'Other',
        lastName: 'User',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2
      });

      const response = await request(app)
        .put(`/api/users/${otherUser._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ firstName: 'Hacked' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/users/:id (Soft Delete)', () => {
    test('should soft delete user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify user is soft deleted
      const user = await User.findById(userId);
      expect(user.isActive).toBe(false);
    });

    test('should not show soft deleted users in user list', async () => {
      // Soft delete user
      await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Get new token from admin
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const deletedUser = response.body.data.find(u => u._id === userId);
      expect(deletedUser).toBeUndefined();
    });
  });

  describe('POST /api/users/bulk', () => {
    test('should create multiple users in bulk', async () => {
      const users = [
        {
          email: 'bulk1@example.com',
          password: 'password123',
          firstName: 'Bulk1',
          lastName: 'User',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 1
        },
        {
          email: 'bulk2@example.com',
          password: 'password123',
          firstName: 'Bulk2',
          lastName: 'User',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 2
        }
      ];

      const response = await request(app)
        .post('/api/users/bulk')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ users })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
    });

    test('should fail without admin privileges', async () => {
      const users = [
        {
          email: 'bulk@example.com',
          password: 'password123',
          firstName: 'Bulk',
          lastName: 'User',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 1
        }
      ];

      const response = await request(app)
        .post('/api/users/bulk')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ users })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
