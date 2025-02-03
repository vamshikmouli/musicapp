'use client';
import { Typography, Button, Box } from '@mui/material';
import { useState } from 'react';

const ComingSoon = () => {
  const [clicked, setClicked] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 3000); // Reset after 3 seconds
    setQuote(getRandomQuote());
  };

  const getRandomQuote = () => {
    const quotes = ['Dont worry 🤖🎨'];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: '#fff5e6',
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        sx={{ fontWeight: 'bold', fontSize: '3rem' }}
      >
        🚧 Hold Tight! We are Almost There! 🚧
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Something amazing is coming... but not right now. We are making it epic!
        💥
      </Typography>

      {/* Dancing emoji */}
      <Typography variant="h4" sx={{ mt: 3, fontSize: '3rem' }}>
        💃🕺
      </Typography>

      {/* Fun Button */}
      <Button
        variant="contained"
        color={clicked ? 'secondary' : 'primary'}
        sx={{ mt: 3, padding: '1rem 2rem', fontSize: '1.2rem' }}
        onClick={handleClick}
      >
        {clicked
          ? 'Slow Down, We are Too Fast! 🚀'
          : 'Hurry Up! Make It Happen! ⏩'}
      </Button>

      {clicked && (
        <>
          <Typography
            variant="body1"
            sx={{ mt: 2, fontStyle: 'italic', fontSize: '1rem' }}
          >
            {quote}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You are a legend for waiting this long. 🏆
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ComingSoon;
