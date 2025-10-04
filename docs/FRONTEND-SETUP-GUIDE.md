# Frontend Setup Guide
## Study Buddy Matcher - React Application

This guide will help you complete the frontend implementation.

---

## Quick Start

```bash
cd /Users/shishirsaurav/Desktop/SIT725/study-buddy-matcher/frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

---

## Current Status

✅ **Already Created:**
- package.json (with all dependencies)
- vite.config.js (dev server + proxy)
- index.html (entry point)
- src/main.jsx (React root with providers)
- src/App.jsx (routing setup)

⏳ **Need to Create:** (follow instructions below)

---

## Files to Create

### 1. Contexts (State Management)

#### `src/contexts/AuthContext.jsx`
```jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user profile
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    const { token, user } = response.data.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const response = await axios.put('/api/auth/profile', updates);
    setUser(response.data.data);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

#### `src/contexts/NotificationContext.jsx`
```jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Connect to Socket.io
      const newSocket = io('http://localhost:5000');

      // Join user's personal room
      newSocket.emit('join', user.id);

      // Listen for match requests
      newSocket.on('new-match-request', (data) => {
        toast.info(`${data.senderName} sent you a match request!`);
        setNotifications(prev => [...prev, data]);
      });

      // Listen for match accepted
      newSocket.on('match-accepted', (data) => {
        toast.success(`${data.userName} accepted your match request!`);
        setNotifications(prev => [...prev, data]);
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ socket, notifications, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
```

### 2. API Service

#### `src/services/api.js`
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Auth endpoints
export const authAPI = {
  login: (email, password) => axios.post(`${API_BASE_URL}/auth/login`, { email, password }),
  register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
  getProfile: () => axios.get(`${API_BASE_URL}/auth/me`),
  updateProfile: (updates) => axios.put(`${API_BASE_URL}/auth/profile`, updates),
  updatePassword: (currentPassword, newPassword) =>
    axios.put(`${API_BASE_URL}/auth/password`, { currentPassword, newPassword })
};

// User endpoints
export const userAPI = {
  getUsers: (filters = {}) => axios.get(`${API_BASE_URL}/users`, { params: filters }),
  getUser: (id) => axios.get(`${API_BASE_URL}/users/${id}`),
  searchUsers: (query) => axios.get(`${API_BASE_URL}/users/search`, { params: { query } }),
  updateUser: (id, updates) => axios.put(`${API_BASE_URL}/users/${id}`, updates),
  deleteUser: (id) => axios.delete(`${API_BASE_URL}/users/${id}`)
};

// Match endpoints
export const matchAPI = {
  getSuggestions: () => axios.get(`${API_BASE_URL}/matches/suggestions`),
  getMyMatches: () => axios.get(`${API_BASE_URL}/matches`),
  sendRequest: (recipientId, message) =>
    axios.post(`${API_BASE_URL}/matches/request`, { recipientId, message }),
  acceptRequest: (matchId) => axios.put(`${API_BASE_URL}/matches/${matchId}/accept`),
  declineRequest: (matchId) => axios.put(`${API_BASE_URL}/matches/${matchId}/decline`)
};

export default {
  auth: authAPI,
  user: userAPI,
  match: matchAPI
};
```

### 3. Components

#### `src/components/Layout.jsx`
```jsx
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Study Buddy Matcher
          </Typography>

          <Button color="inherit" component={RouterLink} to="/dashboard" startIcon={<DashboardIcon />}>
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile" startIcon={<PersonIcon />}>
            Profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/matches" startIcon={<PeopleIcon />}>
            Matches
          </Button>
          <Button color="inherit" component={RouterLink} to="/search" startIcon={<SearchIcon />}>
            Search
          </Button>

          <IconButton color="inherit" component={RouterLink} to="/matches">
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.200' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 Study Buddy Matcher - SIT725 Project
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
```

#### `src/components/MatchCard.jsx`
```jsx
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match, onSendRequest }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
            {match.user.firstName[0]}{match.user.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {match.user.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {match.user.university} - Year {match.user.yearOfStudy}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
          <Typography variant="body2" fontWeight="bold">
            Match Score: {match.matchScore}
          </Typography>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Common Units:
        </Typography>
        <Box sx={{ mb: 1 }}>
          {match.commonUnits.map((unit, index) => (
            <Chip key={index} label={unit.unitCode} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>

        {match.commonInterests.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Common Interests:
            </Typography>
            <Box>
              {match.commonInterests.map((interest, index) => (
                <Chip key={index} label={interest} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Box>
          </>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => navigate(`/user/${match.user.id}`)}>
          View Profile
        </Button>
        <Button size="small" variant="contained" onClick={() => onSendRequest(match.user.id)}>
          Send Request
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchCard;
```

### 4. Pages

#### `src/pages/Login.jsx`
```jsx
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Study Buddy Matcher
          </Typography>
          <Typography component="h2" variant="h6" align="center" gutterBottom color="text.secondary">
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
```

#### `src/pages/Dashboard.jsx`
```jsx
import { useState, useEffect } from 'react';
import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { matchAPI } from '../services/api';
import MatchCard from '../components/MatchCard';

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await matchAPI.getSuggestions();
      setMatches(response.data.data);
    } catch (error) {
      toast.error('Error fetching match suggestions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      await matchAPI.sendRequest(userId, 'Hi! Would you like to study together?');
      toast.success('Match request sent!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending request');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Suggested Study Buddies
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Here are your top matches based on common units, interests, and study preferences.
      </Typography>

      {matches.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No matches found. Try completing your profile with more units and interests.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {matches.map((match) => (
            <Grid item xs={12} sm={6} md={4} key={match.user.id}>
              <MatchCard match={match} onSendRequest={handleSendRequest} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
```

---

## Remaining Pages to Create

Create these files in `src/pages/`:

1. **Register.jsx** - Registration form (similar to Login)
2. **Profile.jsx** - View and edit user profile
3. **Matches.jsx** - View pending/accepted match requests
4. **Search.jsx** - Search and filter users
5. **UserDetail.jsx** - View detailed user profile

Follow the same pattern as Login and Dashboard pages.

---

## Installation & Running

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Next Steps

1. Create all remaining pages and components
2. Test all features
3. Make responsive for mobile
4. Add loading states and error handling
5. Implement form validation with Formik + Yup
6. Add Cypress E2E tests

---

## Tips

- Use Material-UI components for consistency
- Handle errors gracefully with toast notifications
- Keep components small and reusable
- Test on mobile devices (responsive design)
- Use React Developer Tools for debugging

---

**The frontend foundation is set up! Complete the remaining pages using the examples provided.**
