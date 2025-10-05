# Study Buddy Matcher

A web-based application designed to help university students find compatible study partners based on shared academic interests, availability, and learning preferences.

## Team Members
- **Darshan Maheshkumar Moradiya** - Full Stack Developer & Project Lead
- **Ronit Kanubhai Balar** - Backend Developer & Database Architect
- **Jay Vanani** - Frontend Developer & UI/UX Designer
- **Vatsal Gabani** - QA Engineer & DevOps Specialist

## Project Overview

Study Buddy Matcher connects students who share:

- Enrolled units or academic topics
- Available time slots
- Learning preferences (group vs. one-on-one, discussion-based vs. task-oriented)

### Key Features
- User registration and profile setup
- Searchable and filterable peer database
- Automated matching engine
- Real-time messaging and notifications
- Contact request system

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Socket.io (Real-time features)
- JWT (Authentication)

### Frontend
- React.js
- Material-UI / Tailwind CSS
- Axios (API calls)
- Socket.io-client

### Development Tools
- Docker (Containerization)
- Jest (Testing)
- Cypress (E2E Testing)
- ESLint (Code quality)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd study-buddy-matcher
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-buddy-matcher
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

6. Run the application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Using Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## Project Structure

```
study-buddy-matcher/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   ├── tests/          # Test files
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── styles/     # CSS/styling
│   └── public/         # Static files
├── docs/               # Documentation
└── README.md
```

## Testing

### Unit Tests
```bash
cd backend
npm test
```

### E2E Tests
```bash
cd frontend
npm run test:e2e
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### User Endpoints
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Matching Endpoints
- `GET /api/matches` - Get suggested matches
- `POST /api/matches/request` - Send match request
- `PUT /api/matches/:id/accept` - Accept match request
- `PUT /api/matches/:id/decline` - Decline match request

## Development Workflow

1. Create a feature branch
```bash
git checkout -b feature/feature-name
```

2. Make changes and commit regularly
```bash
git add .
git commit -m "Description of changes"
```

3. Push to remote
```bash
git push origin feature/feature-name
```

4. Create Pull Request

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB port (default: 27017)

**Port Already in Use:**
```bash
# Find and kill process using the port
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**Dependencies Not Installing:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Follow the coding standards (ESLint configuration)
2. Write tests for new features
3. Update documentation
4. Keep commits atomic and descriptive
5. Review the rubric requirements before submitting

## License

This project is developed as part of SIT725 coursework at Deakin University.

## Contact

For questions or issues, please contact the team members or raise an issue in the repository.

---

**Note:** This project is continuously being developed. Check the Trello board for current sprint progress and upcoming features.
