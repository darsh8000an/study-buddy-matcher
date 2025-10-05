import { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Grid, Card, CardContent, CardActions,
  Button, Avatar, Chip, CircularProgress, MenuItem, InputAdornment, Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { userAPI, matchAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: '',
    university: '',
    yearOfStudy: '',
    degree: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getUsers(filters);
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Error fetching users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
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
      <Box sx={{
        mb: 4,
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        boxShadow: '0 8px 24px rgba(240, 147, 251, 0.25)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Explore Students
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Search for study partners across your university
        </Typography>
      </Box>

      <Paper sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by name or email"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="University"
              value={filters.university}
              onChange={(e) => handleFilterChange('university', e.target.value)}
              placeholder="e.g. Deakin University"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Year"
              value={filters.yearOfStudy}
              onChange={(e) => handleFilterChange('yearOfStudy', e.target.value)}
              size="small"
            >
              <MenuItem value="">All Years</MenuItem>
              {[1, 2, 3, 4, 5].map((year) => (
                <MenuItem key={year} value={year}>
                  Year {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Degree"
              value={filters.degree}
              onChange={(e) => handleFilterChange('degree', e.target.value)}
              placeholder="e.g. Computer Science"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '40px', textTransform: 'none', fontWeight: 500 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {users.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          {users.length} {users.length === 1 ? 'student found' : 'students found'}
        </Typography>
      )}

      <Grid container spacing={2.5}>
        {users.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
              bgcolor: '#f9fafb',
              borderRadius: 3,
              border: '2px dashed #e5e7eb'
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography variant="h3" sx={{ color: '#9ca3af' }}>
                  🔍
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#374151', mb: 1, fontWeight: 600 }}>
                No students found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search filters
              </Typography>
            </Box>
          </Grid>
        ) : (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Avatar sx={{
                      width: 50,
                      height: 50,
                      mr: 1.5,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      fontWeight: 600
                    }}>
                      {user.firstName[0]}{user.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {user.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {user.university}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.875rem' }}>
                    {user.degree} · Year {user.yearOfStudy}
                  </Typography>

                  {user.bio && (
                    <Typography variant="body2" sx={{ mt: 1, mb: 1.5, fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {user.bio.substring(0, 80)}{user.bio.length > 80 ? '...' : ''}
                    </Typography>
                  )}

                  {user.enrolledUnits.length > 0 && (
                    <Box sx={{ mt: 1.5 }}>
                      {user.enrolledUnits.slice(0, 3).map((unit, idx) => (
                        <Chip
                          key={idx}
                          label={unit.unitCode}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            bgcolor: '#fee2e2',
                            color: '#dc2626',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                      {user.enrolledUnits.length > 3 && (
                        <Chip
                          label={`+${user.enrolledUnits.length - 3}`}
                          size="small"
                          sx={{
                            mb: 0.5,
                            bgcolor: '#fef3c7',
                            color: '#92400e',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                      )}
                    </Box>
                  )}

                  {user.academicInterests.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {user.academicInterests.slice(0, 2).map((interest, idx) => (
                        <Chip
                          key={idx}
                          label={interest}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            fontSize: '0.7rem',
                            bgcolor: '#f3f4f6',
                            color: '#374151',
                            fontWeight: 500,
                            border: '1px solid #e5e7eb'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/user/${user._id}`)}
                    sx={{ textTransform: 'none', fontWeight: 500, color: '#ec4899' }}
                  >
                    View Profile
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleSendRequest(user._id)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
                        boxShadow: '0 6px 16px rgba(240, 147, 251, 0.4)',
                      }
                    }}
                  >
                    Connect
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Search;
