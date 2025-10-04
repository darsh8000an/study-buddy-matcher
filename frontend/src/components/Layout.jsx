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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Study Buddy Matcher
          </Typography>

          <Button color="inherit" component={RouterLink} to="/dashboard" startIcon={<DashboardIcon />}>
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile" startIcon={<PersonIcon />}>
            Profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/matches" startIcon={<PeopleIcon />}>
            Matches
          </Button>
          <Button color="inherit" component={RouterLink} to="/search" startIcon={<SearchIcon />}>
            Search
          </Button>

          <IconButton color="inherit" component={RouterLink} to="/matches">
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.200' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 Study Buddy Matcher - SIT725 Project
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
