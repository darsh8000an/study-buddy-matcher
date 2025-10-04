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

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree Program"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Year of Study"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
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
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself and your study goals..."
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Enrolled Units
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.enrolledUnits.map((unit, index) => (
                  <Chip
                    key={index}
                    label={`${unit.unitCode} - ${unit.unitName}`}
                    onDelete={() => handleDeleteUnit(index)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Unit Code"
                    value={newUnit.unitCode}
                    onChange={(e) => setNewUnit({ ...newUnit, unitCode: e.target.value })}
                    placeholder="e.g., SIT725"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Unit Name"
                    value={newUnit.unitName}
                    onChange={(e) => setNewUnit({ ...newUnit, unitName: e.target.value })}
                    placeholder="e.g., Advanced Web Development"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton color="primary" onClick={handleAddUnit}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={ACADEMIC_INTERESTS}
                value={formData.academicInterests}
                onChange={(e, newValue) => setFormData({ ...formData, academicInterests: newValue })}
                renderInput={(params) => (
                  <TextField {...params} label="Academic Interests" placeholder="Select interests" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={STUDY_PREFERENCES}
                value={formData.studyPreferences.preferredTimes}
                onChange={(e, newValue) => handleStudyPrefChange('preferredTimes', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Preferred Study Times" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                options={STUDY_LOCATIONS}
                value={formData.studyPreferences.preferredLocations}
                onChange={(e, newValue) => handleStudyPrefChange('preferredLocations', newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Preferred Study Locations" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Study Style"
                value={formData.studyPreferences.studyStyle}
                onChange={(e) => handleStudyPrefChange('studyStyle', e.target.value)}
              >
                <MenuItem value="individual">Individual Study</MenuItem>
                <MenuItem value="group">Group Study</MenuItem>
                <MenuItem value="pair">Pair Study</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
