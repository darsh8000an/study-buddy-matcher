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
      <Typography variant="h4" gutterBottom>
        Search Study Buddies
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by name or email"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
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
              placeholder="Filter by university"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Year of Study"
              value={filters.yearOfStudy}
              onChange={(e) => handleFilterChange('yearOfStudy', e.target.value)}
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
              label="Degree Program"
              value={filters.degree}
              onChange={(e) => handleFilterChange('degree', e.target.value)}
              placeholder="Filter by degree"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        {users.length} {users.length === 1 ? 'result' : 'results'}
      </Typography>

      <Grid container spacing={3}>
        {users.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No users found. Try adjusting your search criteria.
            </Typography>
          </Grid>
        ) : (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                      {user.firstName[0]}{user.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {user.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.university}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {user.degree} - Year {user.yearOfStudy}
                  </Typography>

                  {user.bio && (
                    <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                      {user.bio.substring(0, 100)}{user.bio.length > 100 ? '...' : ''}
                    </Typography>
                  )}

                  {user.enrolledUnits.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Units:
                      </Typography>
                      {user.enrolledUnits.slice(0, 3).map((unit, idx) => (
                        <Chip key={idx} label={unit.unitCode} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                      {user.enrolledUnits.length > 3 && (
                        <Chip label={`+${user.enrolledUnits.length - 3} more`} size="small" />
                      )}
                    </Box>
                  )}

                  {user.academicInterests.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Interests:
                      </Typography>
                      {user.academicInterests.slice(0, 2).map((interest, idx) => (
                        <Chip key={idx} label={interest} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  )}
                </CardContent>

                <CardActions>
                  <Button size="small" onClick={() => navigate(`/user/${user._id}`)}>
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleSendRequest(user._id)}
                  >
                    Send Request
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
