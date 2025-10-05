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
      console.log('Fetched matches:', response.data);
      setMatches(response.data.data);
    } catch (error) {
      toast.error('Error fetching matches');
      console.error('Fetch matches error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchId) => {
    try {
      console.log('Accepting match:', matchId);
      const response = await matchAPI.acceptRequest(matchId);
      console.log('Accept response:', response.data);
      toast.success('Match request accepted!');
      // Refresh the matches list
      await fetchMatches();
      // Switch to Connected tab to show the newly accepted match
      setTabValue(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error accepting request');
      console.error('Accept error:', error);
    }
  };

  const handleDecline = async (matchId) => {
    try {
      await matchAPI.declineRequest(matchId);
      toast.info('Match request declined');
      // Refresh the matches list
      await fetchMatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error declining request');
      console.error('Decline error:', error);
    }
  };

  // Filter matches by status - only show pending and accepted, hide declined
  const pendingRequests = matches.filter(m => m.status === 'pending');
  const sentRequests = []; // Will be same as pending for now since we don't track direction
  const acceptedMatches = matches.filter(m => m.status === 'accepted');
  const declinedMatches = matches.filter(m => m.status === 'declined');

  console.log('All matches:', matches);
  console.log('Pending:', pendingRequests.length, 'Accepted:', acceptedMatches.length, 'Declined:', declinedMatches.length);

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          My Connections
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Manage your study partner requests and connections
        </Typography>
      </Box>

      <Tabs
        value={tabValue}
        onChange={(_e, newValue) => setTabValue(newValue)}
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 }
        }}
      >
        <Tab
          label={
            <Badge badgeContent={pendingRequests.length} color="error">
              Pending
            </Badge>
          }
        />
        <Tab label={`Sent (${sentRequests.length})`} />
        <Tab label={`Connected (${acceptedMatches.length})`} />
      </Tabs>

      {/* Pending Requests Tab */}
      {tabValue === 0 && (
        <Grid container spacing={2.5}>
          {pendingRequests.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  No pending requests
                </Typography>
              </Box>
            </Grid>
          ) : (
            pendingRequests.map((match) => (
              <Grid item xs={12} md={6} key={match.user?._id || match._id}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <CardContent sx={{ pb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar sx={{
                        width: 52,
                        height: 52,
                        mr: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontWeight: 600
                      }}>
                        {match.user?.firstName?.[0]}{match.user?.lastName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
                          {match.user?.firstName} {match.user?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {match.user?.university} · Year {match.user?.yearOfStudy}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 1.5, mb: 0.5 }}>
                      {match.user?.enrolledUnits?.slice(0, 3).map((unit, idx) => (
                        <Chip
                          key={idx}
                          label={unit.unitCode}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            bgcolor: '#e0e7ff',
                            color: '#4338ca',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => navigate(`/user/${match.user?._id}`)}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                      View Profile
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDecline(match.user?._id)}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                      Decline
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAccept(match.user?._id)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                        }
                      }}
                    >
                      Accept
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
        <Grid container spacing={2.5}>
          {sentRequests.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  No sent requests yet
                </Typography>
              </Box>
            </Grid>
          ) : (
            sentRequests.map((match) => (
              <Grid item xs={12} md={6} key={match._id}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ pb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar sx={{ width: 52, height: 52, mr: 2, bgcolor: 'primary.main', fontWeight: 600 }}>
                        {match.recipient.firstName[0]}{match.recipient.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
                          {match.recipient.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {match.recipient.university}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      Waiting for response...
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, pt: 0.5 }}>
                    <Button
                      size="small"
                      onClick={() => navigate(`/user/${match.recipient._id}`)}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
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
        <Grid container spacing={2.5}>
          {acceptedMatches.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  No study buddies yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Start connecting with students on the Explore page
                </Typography>
              </Box>
            </Grid>
          ) : (
            acceptedMatches.map((match) => (
              <Grid item xs={12} md={6} key={match.user?._id || match._id}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.12)' } }}>
                  <CardContent sx={{ pb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar sx={{ width: 52, height: 52, mr: 2, bgcolor: 'success.main', fontWeight: 600 }}>
                        {match.user?.firstName?.[0]}{match.user?.lastName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
                          {match.user?.firstName} {match.user?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {match.user?.university} · {match.user?.degree}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.primary' }}>
                      {match.user?.email}
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                      {match.user?.enrolledUnits?.slice(0, 3).map((unit, idx) => (
                        <Chip
                          key={idx}
                          label={unit.unitCode}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5, bgcolor: 'success.50', color: 'success.dark', fontWeight: 500 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, pt: 0.5 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate(`/user/${match.user?._id}`)}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
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
    </Box>
  );
};

export default Matches;
