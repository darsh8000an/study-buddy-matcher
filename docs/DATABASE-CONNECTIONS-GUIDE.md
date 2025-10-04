# Database & Connections Setup Guide
## Study Buddy Matcher - Complete Connection Configuration

---

## ✅ Current Configuration Status

All database and connection configurations are **COMPLETE** and ready to use!

### Files Already Configured:
- ✅ `/backend/.env` - Environment variables
- ✅ `/backend/config/database.js` - MongoDB connection
- ✅ `/backend/server.js` - Server + Socket.io setup
- ✅ `/frontend/vite.config.js` - Frontend proxy
- ✅ `/frontend/src/services/api.js` - API endpoints
- ✅ `/docker-compose.yml` - Container orchestration

---

## 🗄️ Database Configuration

### MongoDB Connection

**Location:** `/backend/.env`

```env
MONGODB_URI=mongodb://localhost:27017/study-buddy-matcher
```

**Options:**

1. **Local MongoDB** (Default)
   ```
   mongodb://localhost:27017/study-buddy-matcher
   ```

2. **MongoDB Atlas** (Cloud - Recommended for Production)
   ```
   mongodb+srv://username:password@cluster.mongodb.net/study-buddy-matcher?retryWrites=true&w=majority
   ```

3. **Docker MongoDB**
   ```
   mongodb://mongodb:27017/study-buddy-matcher
   ```

### How to Change Database:

**Option 1: Local MongoDB**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod` or `brew services start mongodb-community`
3. Keep default `.env`: `MONGODB_URI=mongodb://localhost:27017/study-buddy-matcher`

**Option 2: MongoDB Atlas (Cloud)**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/study-buddy-matcher?retryWrites=true&w=majority
   ```

**Option 3: Docker**
1. Use provided `docker-compose.yml`
2. Run: `docker-compose up -d mongodb`
3. Update `.env`:
   ```env
   MONGODB_URI=mongodb://mongodb:27017/study-buddy-matcher
   ```

---

## 🔌 All Connections Overview

### 1. Backend Server
- **Port:** 5000
- **Protocol:** HTTP + WebSocket
- **URL:** `http://localhost:5000`
- **Configured in:** `backend/.env` and `backend/server.js`

### 2. Frontend Application
- **Port:** 3000
- **Protocol:** HTTP
- **URL:** `http://localhost:3000`
- **Configured in:** `frontend/vite.config.js` and `frontend/package.json`

### 3. MongoDB Database
- **Port:** 27017 (default)
- **Protocol:** MongoDB Wire Protocol
- **URL:** `mongodb://localhost:27017`
- **Database Name:** `study-buddy-matcher`
- **Configured in:** `backend/.env`

### 4. Socket.io (Real-time)
- **Port:** 5000 (same as backend)
- **Protocol:** WebSocket
- **URL:** `ws://localhost:5000`
- **Configured in:** `backend/server.js` and `frontend/src/contexts/NotificationContext.jsx`

### 5. API Endpoints
- **Base URL:** `http://localhost:5000/api`
- **Configured in:** `frontend/src/services/api.js`

---

## 🔗 Connection Flow Diagram

```
┌─────────────────────────────────────────────┐
│  FRONTEND (Port 3000)                       │
│  http://localhost:3000                      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  React App                          │   │
│  │  - Components                       │   │
│  │  - Pages                            │   │
│  │  - Contexts                         │   │
│  └─────────────────────────────────────┘   │
│           │                │                │
│           │ HTTP           │ WebSocket      │
│           │ (Axios)        │ (Socket.io)    │
└───────────┼────────────────┼────────────────┘
            │                │
            ↓                ↓
┌─────────────────────────────────────────────┐
│  BACKEND (Port 5000)                        │
│  http://localhost:5000                      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Express Server                     │   │
│  │  - Routes                           │   │
│  │  - Controllers                      │   │
│  │  - Middleware                       │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │  Socket.io Server                   │   │
│  │  - Real-time events                 │   │
│  │  - Per-user rooms                   │   │
│  └─────────────────────────────────────┘   │
│           │                                 │
│           │ Mongoose                        │
│           │ (MongoDB Driver)                │
└───────────┼─────────────────────────────────┘
            │
            ↓
┌─────────────────────────────────────────────┐
│  DATABASE (Port 27017)                      │
│  mongodb://localhost:27017                  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  MongoDB                            │   │
│  │  Database: study-buddy-matcher      │   │
│  │  Collections:                       │   │
│  │  - users                            │   │
│  │  - matches                          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## 🚀 Starting Everything

### Method 1: Manual Start (Recommended for Development)

**Terminal 1 - MongoDB:**
```bash
# Start MongoDB locally
mongod

# OR with Homebrew (Mac)
brew services start mongodb-community

# OR with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

### Method 2: Docker Compose (Easy All-in-One)

```bash
# Start everything
docker-compose up --build

# OR in background
docker-compose up -d

# Stop everything
docker-compose down
```

✅ Everything running automatically

---

## 🔍 Verifying Connections

### 1. Check Backend Server
```bash
curl http://localhost:5000/api/health
```
**Expected:** `{"success":true,"message":"Server is running"}`

### 2. Check MongoDB Connection
**Backend logs should show:**
```
MongoDB Connected: localhost
Database Name: study-buddy-matcher
```

### 3. Check Frontend
Open browser: http://localhost:3000
**Expected:** Login page displays

### 4. Check Socket.io
**Browser console (after login) should show:**
```
Socket connected
```

### 5. Check API Communication
- Register a user
- **Expected:** Success message, redirect to dashboard
- **Backend logs:** POST /api/auth/register 201

---

## ⚙️ Environment Variables Explained

### Backend `.env` File

```env
# Server Configuration
PORT=5000                    # Backend server port
NODE_ENV=development         # Environment (development/production/test)

# Database
MONGODB_URI=mongodb://localhost:27017/study-buddy-matcher
# ↑ MongoDB connection string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_environment
# ↑ Secret key for JWT tokens (CHANGE IN PRODUCTION!)
JWT_EXPIRE=7d               # Token expiration time

# CORS
CORS_ORIGIN=http://localhost:3000
# ↑ Allowed frontend origin

# Socket.io (Optional - uses same port as backend)
SOCKET_PORT=5001            # Not used currently
```

### Frontend Configuration

**File:** `frontend/vite.config.js`
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

**File:** `frontend/src/services/api.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🔧 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Start MongoDB: `mongod` or `brew services start mongodb-community`
2. Check MongoDB is running: `ps aux | grep mongod`
3. Try different connection string in `.env`

### Issue 2: Backend Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Kill process on port 5000:
   ```bash
   # Find process
   lsof -i :5000

   # Kill it
   kill -9 <PID>
   ```
2. Or change port in `.env`: `PORT=5001`

### Issue 3: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
2. Restart backend server
3. Clear browser cache

### Issue 4: Frontend Can't Connect to Backend

**Error:** `Network Error` or `Failed to fetch`

**Solutions:**
1. Verify backend is running on port 5000
2. Check `API_BASE_URL` in `frontend/src/services/api.js`
3. Verify Vite proxy in `vite.config.js`

### Issue 5: Socket.io Not Connecting

**Error:** `WebSocket connection failed`

**Solutions:**
1. Check backend is running
2. Verify Socket.io URL in `NotificationContext.jsx`
3. Check browser console for errors

### Issue 6: Database Authentication Failed

**Error:** `Authentication failed`

**Solutions:**
1. Check MongoDB Atlas credentials
2. Verify connection string format
3. Ensure IP whitelist in Atlas (0.0.0.0/0 for dev)

---

## 📊 Connection Endpoints Reference

### API Endpoints

**Authentication:**
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/profile` - Update profile
- PUT `/api/auth/password` - Change password

**Users:**
- GET `/api/users` - Get all users (with filters)
- GET `/api/users/:id` - Get user by ID
- GET `/api/users/search` - Search users
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user (soft delete)

**Matches:**
- GET `/api/matches/suggestions` - Get match suggestions
- GET `/api/matches` - Get user's matches
- POST `/api/matches/request` - Send match request
- PUT `/api/matches/:id/accept` - Accept match
- PUT `/api/matches/:id/decline` - Decline match

### Socket.io Events

**Client → Server:**
- `join` - Join user's personal room

**Server → Client:**
- `new-match-request` - New match request received
- `match-accepted` - Match request accepted

---

## 🐳 Docker Configuration

**File:** `docker-compose.yml`

```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/study-buddy-matcher
    depends_on:
      - mongodb
```

**Start with Docker:**
```bash
docker-compose up -d
```

---

## ✅ Pre-Deployment Checklist

### Security (IMPORTANT for Production):

- [ ] Change `JWT_SECRET` in `.env` to strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to production frontend URL
- [ ] Enable MongoDB authentication
- [ ] Use environment variables (not hardcoded values)
- [ ] Add rate limiting
- [ ] Enable HTTPS

### Database:

- [ ] MongoDB is accessible
- [ ] Connection string is correct
- [ ] Database name is set
- [ ] Indexes are created (if needed)
- [ ] Backup strategy in place (for production)

### Application:

- [ ] All dependencies installed
- [ ] Environment variables set
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register/login users
- [ ] Can create matches
- [ ] Real-time notifications work

---

## 🎯 Quick Troubleshooting Commands

```bash
# Check MongoDB status
mongod --version
ps aux | grep mongod

# Check ports in use
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Test backend API
curl http://localhost:5000/api/health

# View backend logs
cd backend && npm run dev

# View MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart MongoDB (Mac)
brew services restart mongodb-community

# View Docker logs
docker-compose logs -f
```

---

## 📝 Summary

### ✅ All Connections Configured:

1. **Frontend ↔ Backend:** HTTP + WebSocket ✅
2. **Backend ↔ Database:** MongoDB ✅
3. **Real-time:** Socket.io ✅
4. **API:** RESTful endpoints ✅
5. **Security:** JWT, CORS, Helmet ✅

### 🚀 To Start:

```bash
# Option 1: Manual
mongod                    # Terminal 1
cd backend && npm run dev # Terminal 2
cd frontend && npm run dev # Terminal 3

# Option 2: Docker
docker-compose up --build
```

### ✅ Everything is ready to run!

No additional configuration needed. Just start the services and begin development.

---

**All connections are configured and tested! You're ready to go! 🚀**
