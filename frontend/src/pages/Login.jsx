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
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }
    }}>
      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            border: '3px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Typography variant="h3" sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800
            }}>
              SB
            </Typography>
          </Box>

          <Typography component="h1" variant="h3" align="center" sx={{
            fontWeight: 800,
            mb: 1,
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            Welcome Back!
          </Typography>
          <Typography component="h2" variant="body1" align="center" sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem'
          }}>
            Sign in to find your perfect study buddy
          </Typography>

          <Paper sx={{
            p: 5,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}>
            <Box component="form" onSubmit={handleSubmit}>
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
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                    }
                  }
                }}
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
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                    }
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.8,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: '#666', fontSize: '0.95rem' }}>
                  New to StudyBuddy?{' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
