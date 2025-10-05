import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link, Paper, Grid, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    degree: '',
    yearOfStudy: 1
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
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
            Join StudyBuddy
          </Typography>
          <Typography component="h2" variant="body1" align="center" sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem'
          }}>
            Connect with students and find your perfect study partner
          </Typography>

          <Paper sx={{
            p: 5,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="university"
                  label="University"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g. Deakin University"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="degree"
                  label="Degree Program"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  name="yearOfStudy"
                  label="Year of Study"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                >
                  <MenuItem value={1}>Year 1</MenuItem>
                  <MenuItem value={2}>Year 2</MenuItem>
                  <MenuItem value={3}>Year 3</MenuItem>
                  <MenuItem value={4}>Year 4</MenuItem>
                  <MenuItem value={5}>Year 5+</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '&:hover': { backgroundColor: '#ffffff' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' }
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '0.95rem' }}>
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
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
                  Sign in
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

export default Register;
