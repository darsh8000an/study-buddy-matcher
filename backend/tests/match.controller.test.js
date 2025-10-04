const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Match Controller Tests', () => {
  let user1Token, user1Id;
  let user2Token, user2Id;
  let user3Token, user3Id;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/study-buddy-test');
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create User 1 with units and interests
    const user1Response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user1@example.com',
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Smith',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2,
        enrolledUnits: [
          { unitCode: 'SIT725', unitName: 'Web Development' },
          { unitCode: 'SIT737', unitName: 'Data Science' }
        ],
        academicInterests: ['Web Development', 'Machine Learning']
      });

    user1Token = user1Response.body.data.token;
    user1Id = user1Response.body.data.user._id;

    // Create User 2 with common units
    const user2Response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user2@example.com',
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Johnson',
        university: 'Test University',
        degree: 'Computer Science',
        yearOfStudy: 2,
        enrolledUnits: [
          { unitCode: 'SIT725', unitName: 'Web Development' },
          { unitCode: 'SIT722', unitName: 'Cloud Computing' }
        ],
        academicInterests: ['Web Development', 'Cloud Computing']
      });

    user2Token = user2Response.body.data.token;
    user2Id = user2Response.body.data.user._id;

    // Create User 3 with no common units
    const user3Response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user3@example.com',
        password: 'password123',
        firstName: 'Carol',
        lastName: 'Williams',
        university: 'Other University',
        degree: 'Engineering',
        yearOfStudy: 3,
        enrolledUnits: [
          { unitCode: 'ENG101', unitName: 'Engineering Basics' }
        ],
        academicInterests: ['Robotics']
      });

    user3Token = user3Response.body.data.token;
    user3Id = user3Response.body.data.user._id;
  });

  describe('GET /api/matches/suggestions', () => {
    test('should get match suggestions for user', async () => {
      const response = await request(app)
        .get('/api/matches/suggestions')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should rank matches by score', async () => {
      const response = await request(app)
        .get('/api/matches/suggestions')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      const matches = response.body.data;

      // User2 should score higher than User3 (common units)
      if (matches.length >= 2) {
        const scores = matches.map(m => m.matchScore);
        const isSorted = scores.every((score, i) => i === 0 || scores[i - 1] >= score);
        expect(isSorted).toBe(true);
      }
    });

    test('should include common units in match data', async () => {
      const response = await request(app)
        .get('/api/matches/suggestions')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      const user2Match = response.body.data.find(m => m.user.email === 'user2@example.com');

      if (user2Match) {
        expect(user2Match.commonUnits).toBeDefined();
        expect(user2Match.commonUnits.length).toBeGreaterThan(0);
        expect(user2Match.commonUnits[0].unitCode).toBe('SIT725');
      }
    });

    test('should include common interests in match data', async () => {
      const response = await request(app)
        .get('/api/matches/suggestions')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      const user2Match = response.body.data.find(m => m.user.email === 'user2@example.com');

      if (user2Match) {
        expect(user2Match.commonInterests).toBeDefined();
        expect(user2Match.commonInterests).toContain('Web Development');
      }
    });

    test('should limit suggestions to top 20', async () => {
      // Create many users
      for (let i = 0; i < 25; i++) {
        await User.create({
          email: `test${i}@example.com`,
          password: 'password123',
          firstName: `Test${i}`,
          lastName: 'User',
          university: 'Test University',
          degree: 'Computer Science',
          yearOfStudy: 2,
          enrolledUnits: [{ unitCode: 'SIT725', unitName: 'Web Development' }]
        });
      }

      const response = await request(app)
        .get('/api/matches/suggestions')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(20);
    });

    test('should fail without authentication', async () => {
      const response = await request(app)
        .get('/api/matches/suggestions')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/matches/request', () => {
    test('should send match request successfully', async () => {
      const response = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'Would you like to study together?'
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.sender).toBe(user1Id);
      expect(response.body.data.recipient).toBe(user2Id);
      expect(response.body.data.status).toBe('pending');
    });

    test('should fail to send duplicate request', async () => {
      // First request
      await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'First request'
        })
        .expect(201);

      // Duplicate request
      const response = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'Duplicate request'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });

    test('should fail to send request to self', async () => {
      const response = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user1Id,
          message: 'Request to self'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should require message field', async () => {
      const response = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/matches', () => {
    beforeEach(async () => {
      // Create some match requests
      await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'Request 1'
        });

      await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user3Token}`)
        .send({
          recipientId: user1Id,
          message: 'Request 2'
        });
    });

    test('should get all user matches', async () => {
      const response = await request(app)
        .get('/api/matches')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });

    test('should filter matches by status', async () => {
      const response = await request(app)
        .get('/api/matches')
        .query({ status: 'pending' })
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach(match => {
        expect(match.status).toBe('pending');
      });
    });
  });

  describe('PUT /api/matches/:id/accept', () => {
    let matchId;

    beforeEach(async () => {
      const matchResponse = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'Study request'
        });

      matchId = matchResponse.body.data._id;
    });

    test('should accept match request', async () => {
      const response = await request(app)
        .put(`/api/matches/${matchId}/accept`)
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('accepted');
    });

    test('should fail if not the recipient', async () => {
      const response = await request(app)
        .put(`/api/matches/${matchId}/accept`)
        .set('Authorization', `Bearer ${user3Token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    test('should fail with invalid match ID', async () => {
      const response = await request(app)
        .put('/api/matches/invalid-id/accept')
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/matches/:id/decline', () => {
    let matchId;

    beforeEach(async () => {
      const matchResponse = await request(app)
        .post('/api/matches/request')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          recipientId: user2Id,
          message: 'Study request'
        });

      matchId = matchResponse.body.data._id;
    });

    test('should decline match request', async () => {
      const response = await request(app)
        .put(`/api/matches/${matchId}/decline`)
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('declined');
    });

    test('should fail if not the recipient', async () => {
      const response = await request(app)
        .put(`/api/matches/${matchId}/decline`)
        .set('Authorization', `Bearer ${user3Token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
