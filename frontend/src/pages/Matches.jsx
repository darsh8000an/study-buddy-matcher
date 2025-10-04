import { useState, useEffect } from 'react';
import {
  Box, Typography, Tabs, Tab, Grid, Card, CardContent, CardActions,
  Button, Avatar, Chip, CircularProgress, Badge
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { matchAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Matches = () => {
  const [tabValue, setTabValue] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await matchAPI.getMyMatches();
      setMatches(response.data.data);
    } catch (error) {
      toast.error('Error fetching matches');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchId) => {
    try {
      await matchAPI.acceptRequest(matchId);
      toast.success('Match request accepted!');
      fetchMatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error accepting request');
    }
  };

  const handleDecline = async (matchId) => {
    try {
      await matchAPI.declineRequest(matchId);
      toast.info('Match request declined');
      fetchMatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error declining request');
    }
  };

  const pendingRequests = matches.filter(m => m.status === 'pending' && m.recipient._id === m.currentUserId);
  const sentRequests = matches.filter(m => m.status === 'pending' && m.sender._id === m.currentUserId);
  const acceptedMatches = matches.filter(m => m.status === 'accepted');

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
        My Matches
      </Typography>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab
          label={
            <Badge badgeContent={pendingRequests.length} color="error">
              Pending Requests
            </Badge>
          }
        />
        <Tab label={`Sent Requests (${sentRequests.length})`} />
        <Tab label={`Accepted Matches (${acceptedMatches.length})`} />
      </Tabs>

      {/* Pending Requests Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {pendingRequests.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary">No pending requests</Typography>
            </Grid>
          ) : (
            pendingRequests.map((match) => (
              <Grid item xs={12} md={6} key={match._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                        {match.sender.firstName[0]}{match.sender.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          {match.sender.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {match.sender.university} - Year {match.sender.yearOfStudy}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" paragraph>
                      <strong>Message:</strong> {match.message}
                    </Typography>
                    <Box>
                      {match.sender.enrolledUnits.slice(0, 3).map((unit, idx) => (
                        <Chip key={idx} label={unit.unitCode} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/user/${match.sender._id}`)}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={() => handleAccept(match._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon />}
                      onClick={() => handleDecline(match._id)}
                    >
                      Decline
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Sent Requests Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {sentRequests.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary">No sent requests</Typography>
            </Grid>
          ) : (
            sentRequests.map((match) => (
              <Grid item xs={12} md={6} key={match._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                        {match.recipient.firstName[0]}{match.recipient.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          {match.recipient.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {match.recipient.university}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Waiting for response...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/user/${match.recipient._id}`)}
                    >
                      View Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Accepted Matches Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          {acceptedMatches.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary">No accepted matches yet</Typography>
            </Grid>
          ) : (
            acceptedMatches.map((match) => {
              const otherUser = match.sender._id === match.currentUserId ? match.recipient : match.sender;
              return (
                <Grid item xs={12} md={6} key={match._id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                          {otherUser.firstName[0]}{otherUser.lastName[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {otherUser.fullName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {otherUser.university} - {otherUser.degree}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Email:</strong> {otherUser.email}
                      </Typography>
                      <Box>
                        {otherUser.enrolledUnits.slice(0, 3).map((unit, idx) => (
                          <Chip key={idx} label={unit.unitCode} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/user/${otherUser._id}`)}
                      >
                        View Full Profile
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Matches;
