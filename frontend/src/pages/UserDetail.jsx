import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Chip, Avatar, Button, CircularProgress,
  Divider, List, ListItem, ListItemText
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import { userAPI, matchAPI } from '../services/api';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getUser(userId);
      setUser(response.data.data);
    } catch (error) {
      toast.error('Error fetching user details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
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

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">User not found</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 3, fontSize: '2rem' }}>
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {user.fullName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={<EmailIcon />}
                    label={user.email}
                    variant="outlined"
                  />
                  <Chip
                    icon={<SchoolIcon />}
                    label={`Year ${user.yearOfStudy}`}
                    color="primary"
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleSendRequest}
                size="large"
              >
                Send Request
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Academic Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="University"
                  secondary={user.university}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Degree Program"
                  secondary={user.degree}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Year of Study"
                  secondary={`Year ${user.yearOfStudy}`}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Bio */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {user.bio || 'No bio provided'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Enrolled Units */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Enrolled Units
            </Typography>
            {user.enrolledUnits.length === 0 ? (
              <Typography color="text.secondary">No units added</Typography>
            ) : (
              <Grid container spacing={1}>
                {user.enrolledUnits.map((unit, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={`${unit.unitCode} - ${unit.unitName}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          {/* Academic Interests */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Academic Interests
            </Typography>
            {user.academicInterests.length === 0 ? (
              <Typography color="text.secondary">No interests added</Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.academicInterests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Grid>

          {/* Study Preferences */}
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Study Preferences
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Preferred Times
                </Typography>
                {user.studyPreferences?.preferredTimes?.length > 0 ? (
                  user.studyPreferences.preferredTimes.map((time, idx) => (
                    <Chip key={idx} label={time} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">Not specified</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Preferred Locations
                </Typography>
                {user.studyPreferences?.preferredLocations?.length > 0 ? (
                  user.studyPreferences.preferredLocations.map((location, idx) => (
                    <Chip key={idx} label={location} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">Not specified</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Study Style
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.studyPreferences?.studyStyle || 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserDetail;
