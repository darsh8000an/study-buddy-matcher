import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Grid, Chip, IconButton,
  MenuItem, Autocomplete, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const ACADEMIC_INTERESTS = [
  'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
  'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design',
  'Database Design', 'Algorithms', 'Software Testing', 'Agile Development'
];

const STUDY_PREFERENCES = ['Morning', 'Afternoon', 'Evening', 'Late Night'];
const STUDY_LOCATIONS = ['Library', 'Home', 'Cafe', 'Campus', 'Online'];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    university: '',
    degree: '',
    yearOfStudy: 1,
    bio: '',
    academicInterests: [],
    studyPreferences: {
      preferredTimes: [],
      preferredLocations: [],
      studyStyle: ''
    },
    enrolledUnits: []
  });

  const [newUnit, setNewUnit] = useState({ unitCode: '', unitName: '' });

  useEffect(() => {
    console.log('Profile - User data:', user);
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        university: user.university || '',
        degree: user.degree || '',
        yearOfStudy: user.yearOfStudy || 1,
        bio: user.bio || '',
        academicInterests: user.academicInterests || [],
        studyPreferences: user.studyPreferences || {
          preferredTimes: [],
          preferredLocations: [],
          studyStyle: ''
        },
        enrolledUnits: user.enrolledUnits || []
      });
      setPageLoading(false);
    } else {
      // If no user after 2 seconds, stop loading
      setTimeout(() => setPageLoading(false), 2000);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStudyPrefChange = (field, value) => {
    setFormData({
      ...formData,
      studyPreferences: {
        ...formData.studyPreferences,
        [field]: value
      }
    });
  };

  const handleAddUnit = () => {
    if (newUnit.unitCode && newUnit.unitName) {
      setFormData({
        ...formData,
        enrolledUnits: [...formData.enrolledUnits, newUnit]
      });
      setNewUnit({ unitCode: '', unitName: '' });
    }
  };

  const handleDeleteUnit = (index) => {
    setFormData({
      ...formData,
      enrolledUnits: formData.enrolledUnits.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Unable to load profile. Please try logging in again.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Edit Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update your information and study preferences
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="University"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree/Program"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Year"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
                size="small"
              >
                {[1, 2, 3, 4, 5].map((year) => (
                  <MenuItem key={year} value={year}>
                    Year {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="About Me"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell others about yourself..."
                size="small"
              />
            </Grid>
          </Grid>

          {/* Academic Details */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 500 }}>
            Academic Details
          </Typography>
          <Grid container spacing={2.5}>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
                My Units
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.enrolledUnits.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No units added yet
                  </Typography>
                ) : (
                  formData.enrolledUnits.map((unit, index) => (
                    <Chip
                      key={index}
                      label={`${unit.unitCode} - ${unit.unitName}`}
                      onDelete={() => handleDeleteUnit(index)}
                      sx={{ mr: 1, mb: 1 }}
                      size="small"
                    />
                  ))
                )}
              </Box>
              <Grid container spacing={1.5} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Code"
                    value={newUnit.unitCode}
                    onChange={(e) => setNewUnit({ ...newUnit, unitCode: e.target.value.toUpperCase() })}
                    placeholder="SIT725"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    fullWidth
                    label="Unit Name"
                    value={newUnit.unitName}
                    onChange={(e) => setNewUnit({ ...newUnit, unitName: e.target.value })}
                    placeholder="Advanced Web Development"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="outlined"
                    onClick={handleAddUnit}
                    startIcon={<AddIcon />}
                    size="small"
                    fullWidth
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={ACADEMIC_INTERESTS}
                value={formData.academicInterests}
                onChange={(_e, newValue) => setFormData({ ...formData, academicInterests: newValue })}
                renderInput={(params) => (
                  <TextField {...params} label="Interests" placeholder="What are you interested in?" size="small" />
                )}
                size="small"
              />
            </Grid>
          </Grid>

          {/* Study Preferences */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 500 }}>
            Study Preferences
          </Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={STUDY_PREFERENCES}
                value={formData.studyPreferences.preferredTimes}
                onChange={(_e, newValue) => handleStudyPrefChange('preferredTimes', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="When do you study?" size="small" />
                )}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={STUDY_LOCATIONS}
                value={formData.studyPreferences.preferredLocations}
                onChange={(_e, newValue) => handleStudyPrefChange('preferredLocations', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Where do you study?" size="small" />
                )}
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Preferred Study Style"
                value={formData.studyPreferences.studyStyle}
                onChange={(e) => handleStudyPrefChange('studyStyle', e.target.value)}
                size="small"
              >
                <MenuItem value="individual">Solo</MenuItem>
                <MenuItem value="group">Group</MenuItem>
                <MenuItem value="pair">With a Partner</MenuItem>
                <MenuItem value="flexible">I'm Flexible</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ px: 4, py: 1.2, fontWeight: 500 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => window.location.reload()}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
