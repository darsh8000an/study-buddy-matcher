import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5002';

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
      const response = await axios.get(`${API_URL}/api/auth/me`);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    const { token, user: returnedUser } = response.data.data;

    // Store token
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Ensure user has _id field (backend returns 'id')
    const user = {
      ...returnedUser,
      _id: returnedUser.id || returnedUser._id
    };

    setUser(user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    const { token, user: returnedUser } = response.data.data;

    // Store token
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Ensure user has _id field (backend returns 'id')
    const user = {
      ...returnedUser,
      _id: returnedUser.id || returnedUser._id
    };

    setUser(user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const response = await axios.put(`${API_URL}/api/auth/profile`, updates);
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
