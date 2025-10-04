import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match, onSendRequest }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
            {match.user.firstName[0]}{match.user.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {match.user.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {match.user.university} - Year {match.user.yearOfStudy}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
          <Typography variant="body2" fontWeight="bold">
            Match Score: {match.matchScore}
          </Typography>
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Common Units:
        </Typography>
        <Box sx={{ mb: 1 }}>
          {match.commonUnits.map((unit, index) => (
            <Chip key={index} label={unit.unitCode} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>

        {match.commonInterests.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Common Interests:
            </Typography>
            <Box>
              {match.commonInterests.map((interest, index) => (
                <Chip key={index} label={interest} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Box>
          </>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => navigate(`/user/${match.user.id}`)}>
          View Profile
        </Button>
        <Button size="small" variant="contained" onClick={() => onSendRequest(match.user.id)}>
          Send Request
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchCard;
