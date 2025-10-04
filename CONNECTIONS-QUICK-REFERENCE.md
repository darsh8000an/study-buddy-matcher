# 🔌 Connections Quick Reference
## Study Buddy Matcher - All Ports & URLs

---

## 📍 Application URLs

| Service | URL | Port | Status |
|---------|-----|------|--------|
| **Frontend** | http://localhost:3000 | 3000 | ✅ Configured |
| **Backend API** | http://localhost:5000 | 5000 | ✅ Configured |
| **MongoDB** | mongodb://localhost:27017 | 27017 | ✅ Configured |
| **Socket.io** | ws://localhost:5000 | 5000 | ✅ Configured |

---

## 🚀 Quick Start Commands

### Start Everything (3 Terminals)

**Terminal 1 - Database:**
```bash
mongod
# OR: brew services start mongodb-community
# OR: docker run -d -p 27017:27017 --name mongodb mongo
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```
✅ Running on: **http://localhost:5000**

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
✅ Running on: **http://localhost:3000**

### OR Use Docker (1 Command)

```bash
docker-compose up --build
```
✅ Everything starts automatically

---

## 🔗 Connection Details

### Frontend → Backend
- **Method:** HTTP (Axios)
- **Base URL:** `http://localhost:5000/api`
- **Configured in:** `frontend/src/services/api.js`
- **Proxy:** Vite proxy in `vite.config.js`

### Frontend → Socket.io
- **Method:** WebSocket
- **URL:** `http://localhost:5000`
- **Configured in:** `frontend/src/contexts/NotificationContext.jsx`
- **Library:** socket.io-client

### Backend → MongoDB
- **Connection String:** `mongodb://localhost:27017/study-buddy-matcher`
- **Configured in:** `backend/.env`
- **Driver:** Mongoose
- **File:** `backend/config/database.js`

---

## 🌐 Environment Variables

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/study-buddy-matcher
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_environment
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### No Frontend .env Needed
All configured in `vite.config.js` and `api.js`

---

## 🔍 Test Connections

### 1. Backend Health Check
```bash
curl http://localhost:5000/api/health
```
**Expected:** `{"success":true,"message":"Server is running"}`

### 2. MongoDB Connection
**Check backend logs for:**
```
MongoDB Connected: localhost
Database Name: study-buddy-matcher
```

### 3. Frontend
**Open browser:** http://localhost:3000
**Expected:** Login page displays

### 4. Socket.io
**Browser console (after login):**
```
Socket connected
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user
- `GET /api/users/search` - Search

### Matches
- `GET /api/matches/suggestions` - Get suggestions
- `POST /api/matches/request` - Send request
- `PUT /api/matches/:id/accept` - Accept match

---

## ⚠️ Common Issues

### MongoDB Not Running
```bash
# Mac
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Port 5000 Busy
```bash
# Find & kill process
lsof -i :5000
kill -9 <PID>
```

### CORS Error
- Check `CORS_ORIGIN` in `backend/.env` = `http://localhost:3000`
- Restart backend

### Frontend Can't Connect
- Verify backend running on port 5000
- Check `API_BASE_URL` in `frontend/src/services/api.js`

---

## 📊 Status Check

```bash
# Check what's running
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :27017 # MongoDB

# View logs
cd backend && npm run dev  # Backend logs
cd frontend && npm run dev # Frontend logs
```

---

## ✅ Everything Configured!

All connections are set up and ready. Just run the start commands above and you're good to go! 🚀

**Main Files:**
- Backend: `/backend/.env`, `/backend/server.js`
- Frontend: `/frontend/vite.config.js`, `/frontend/src/services/api.js`
- Database: `/backend/config/database.js`

**Full Guide:** See `/docs/DATABASE-CONNECTIONS-GUIDE.md`
