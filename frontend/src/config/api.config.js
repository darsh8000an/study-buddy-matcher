/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5002',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5002',
  TIMEOUT: 10000,
};

export default API_CONFIG;
