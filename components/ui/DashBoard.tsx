'use client';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

const DashBoard = () => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        padding: 3,
      }}
    >
      <Typography
        variant="h2"
        color="primary"
        sx={{ fontWeight: 'bold', fontSize: '3rem' }}
      >
        😎 Welcome to Your Dashboard! 🚀
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Where everything is important, but nothing is urgent. 😆
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        color={clicked ? 'secondary' : 'primary'}
        sx={{ mt: 3, padding: '1rem 2rem', fontSize: '1.2rem' }}
        onClick={handleButtonClick}
      >
        {clicked ? 'Chill, It’s All Good! 🍹' : 'Let’s Get This Done! 💼'}
      </Button>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mt: 5, maxWidth: '90%' }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="h5">Tasks Left 📝</Typography>
              <Typography variant="h6">42</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: '#fff0f5' }}>
            <CardContent>
              <Typography variant="h5">Coffee Cups ☕️</Typography>
              <Typography variant="h6">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: '#f8f8f0' }}>
            <CardContent>
              <Typography variant="h5">Emails Unread 📧</Typography>
              <Typography variant="h6">99+</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fun Paper Element */}
      <Paper
        sx={{
          mt: 5,
          padding: 3,
          backgroundColor: '#e0f7fa',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
          Remember, don’t work hard, work smart! 😏💡
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
          We believe in you, even if you don’t. 😂
        </Typography>
      </Paper>
    </Box>
  );
};

export default DashBoard;
