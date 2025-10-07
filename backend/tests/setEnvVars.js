/**
 * Set environment variables for testing
 * This runs before all tests
 */

process.env.NODE_ENV = 'test';
process.env.PORT = 5002;
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/study-buddy-matcher-test';
