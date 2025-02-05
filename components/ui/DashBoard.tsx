'use client';

import { Container, Paper, Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

const funnyQuotes = [
  'Code is like humor. When you have to explain it, it’s bad. 😆',
  'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
  "I'm not lazy. I'm on energy-saving mode. 🔋",
  'Real programmers count from 0, not 1. 😎',
  'If debugging is the process of removing bugs, then programming must be the process of putting them in. 🤯',
];

const Dashboard = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNewQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % funnyQuotes.length);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Funny Header */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          textAlign: 'center',
          backgroundColor: '#ffe4b5',
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          🚀 Welcome to Your Music Dashboard!
        </Typography>
        <Typography variant="body1" mt={1}>
          Work hard, but don’t forget to laugh! 😂
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Panel - Funny Quote */}
        <Grid size={12}>
          <Paper sx={{ p: 3, minHeight: 150, boxShadow: 5, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              🤩 Today’s Dev Wisdom:
            </Typography>
            <Typography variant="body1" mt={2}>
              {funnyQuotes[quoteIndex]}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleNewQuote}
            >
              Get Another Quote
            </Button>
          </Paper>
        </Grid>

        {/* Right Panel - Fun Section */}
        <Grid size={12}>
          <Paper
            sx={{ p: 2, textAlign: 'center', boxShadow: 5, borderRadius: 2 }}
          >
            <Typography variant="h6">
              🤣 Don’t Take Life Too Seriously
            </Typography>
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#ffeb3b',
                borderRadius: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: 3,
              }}
            >
              “Keep calm and write code! 💻”
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
