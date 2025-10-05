import { useState, useEffect } from 'react';
import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { matchAPI } from '../services/api';
import MatchCard from '../components/MatchCard';

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await matchAPI.getSuggestions();
      setMatches(response.data.data);
    } catch (error) {
      toast.error('Error fetching match suggestions');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Find Your Study Buddy
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          We've found students who match your interests and study goals
        </Typography>
      </Box>

      {matches.length === 0 ? (
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
              👥
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#374151', mb: 1, fontWeight: 600 }}>
            No matches yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete your profile with units and interests to find study partners
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {matches.map((match) => (
            <Grid item xs={12} sm={6} lg={4} key={match.user.id}>
              <MatchCard match={match} onSendRequest={handleSendRequest} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
