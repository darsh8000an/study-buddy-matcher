import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const MatchCard = ({ match, onSendRequest }) => {
  const navigate = useNavigate();

  return (
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{
            width: 56,
            height: 56,
            mr: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontWeight: 600,
            fontSize: '1.25rem'
          }}>
            {match.user.firstName[0]}{match.user.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem', mb: 0.3 }}>
              {match.user.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              {match.user.university} · Year {match.user.yearOfStudy}
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          mb: 1.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          bgcolor: '#fef3c7',
          border: '1px solid #fcd34d'
        }}>
          <StarIcon sx={{ color: '#f59e0b', mr: 0.5, fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#92400e' }}>
            {match.matchScore}% Match
          </Typography>
        </Box>

        {match.commonUnits.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Common Units
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              {match.commonUnits.map((unit, index) => (
                <Chip
                  key={index}
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
          </Box>
        )}

        {match.commonInterests.length > 0 && (
          <Box>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Common Interests
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              {match.commonInterests.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  size="small"
                  sx={{
                    mr: 0.5,
                    mb: 0.5,
                    bgcolor: '#f3f4f6',
                    color: '#374151',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    border: '1px solid #e5e7eb'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1 }}>
        <Button
          size="small"
          onClick={() => navigate(`/user/${match.user.id}`)}
          sx={{ textTransform: 'none', fontWeight: 500, color: '#6366f1' }}
        >
          View Profile
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          size="small"
          variant="contained"
          onClick={() => onSendRequest(match.user.id)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a4298 100%)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
            }
          }}
        >
          Connect
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchCard;
