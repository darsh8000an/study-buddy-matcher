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
