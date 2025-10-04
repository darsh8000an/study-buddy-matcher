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
      <Typography variant="h4" gutterBottom>
        Suggested Study Buddies
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Here are your top matches based on common units, interests, and study preferences.
      </Typography>

      {matches.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No matches found. Try completing your profile with more units and interests.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {matches.map((match) => (
            <Grid item xs={12} sm={6} md={4} key={match.user.id}>
              <MatchCard match={match} onSendRequest={handleSendRequest} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
