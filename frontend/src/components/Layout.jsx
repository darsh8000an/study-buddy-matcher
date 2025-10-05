import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
                SB
              </Typography>
            </Box>
            <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 700, fontSize: '1.3rem' }}>
              StudyBuddy
            </Typography>
          </Box>

          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            startIcon={<DashboardIcon />}
            sx={{
              color: 'white',
              mx: 0.5,
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/search"
            startIcon={<SearchIcon />}
            sx={{
              color: 'white',
              mx: 0.5,
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            Explore
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/matches"
            startIcon={<PeopleIcon />}
            sx={{
              color: 'white',
              mx: 0.5,
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            Matches
          </Button>

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/matches"
            sx={{
              mx: 1,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/profile"
            sx={{
              mx: 0.5,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <PersonIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              ml: 1,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4, maxWidth: 'lg' }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
          © 2025 StudyBuddy · Made with ❤️ for SIT725
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
