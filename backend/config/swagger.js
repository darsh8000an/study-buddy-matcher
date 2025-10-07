/**
 * Swagger/OpenAPI Configuration
 * Generates interactive API documentation
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Study Buddy Matcher API',
      version: '1.0.0',
      description: 'RESTful API for the Study Buddy Matcher application - connecting students with compatible study partners',
      contact: {
        name: 'Study Buddy Matcher Team',
        email: 'support@studybuddymatcher.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.studybuddymatcher.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password', 'firstName', 'lastName', 'university', 'degree', 'yearOfStudy'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            university: {
              type: 'string',
              description: 'University name'
            },
            degree: {
              type: 'string',
              description: 'Degree/Program'
            },
            yearOfStudy: {
              type: 'integer',
              minimum: 1,
              maximum: 6,
              description: 'Current year of study'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role for access control'
            },
            enrolledUnits: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  unitCode: { type: 'string' },
                  unitName: { type: 'string' }
                }
              }
            },
            studyPreferences: {
              type: 'object',
              properties: {
                preferredStudyMode: {
                  type: 'string',
                  enum: ['online', 'in-person', 'hybrid', 'flexible']
                },
                groupSize: {
                  type: 'string',
                  enum: ['one-on-one', 'small-group', 'large-group', 'any']
                },
                studyStyle: {
                  type: 'string',
                  enum: ['discussion-based', 'task-oriented', 'mixed']
                }
              }
            }
          }
        },
        Match: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            },
            matchScore: {
              type: 'integer',
              description: 'Compatibility score'
            },
            commonUnits: {
              type: 'array',
              items: { type: 'object' }
            },
            commonInterests: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            errors: {
              type: 'array',
              items: { type: 'object' }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
