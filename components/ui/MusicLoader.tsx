'use client';

import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const MusicLoader = () => {
  const [funnyText, setFunnyText] = useState('Tuning the Guitar...');

  useEffect(() => {
    const texts = [
      'Tuning the Guitar...',
      'Warming up the Vocal Cords...',
      'Drummer is Late Again...',
      'Checking Mic, 1... 2... 3...',
      'Getting the Band Together...',
      'Fixing a Broken String...',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setFunnyText(texts[index]);
      index = (index + 1) % texts.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid size={12} container spacing={5} justifyContent="center">
      {/* Bouncing Musical Notes */}
      <Grid size={12} display="flex" justifyContent="center">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <Music
              size={40}
              className={`text-${['blue', 'green', 'red'][i]}-500`}
            />
          </motion.div>
        ))}
      </Grid>

      {/* Loading Spinner & Funny Text */}
      <Grid size={12} textAlign="center">
        <CircularProgress size={40} />
        <Typography variant="h6" mt={2} color="text.secondary">
          {funnyText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MusicLoader;
