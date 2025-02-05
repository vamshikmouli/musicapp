'use client';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import { LucideIcon, Music } from 'lucide-react';

interface EmptyStateCardProps {
  icon?: LucideIcon;
  title: string;
  message: string;
}

const EmptyCard = ({
  icon: Icon = Music,
  title,
  message,
}: EmptyStateCardProps) => {
  return (
    <Grid
      container
      size={12}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: 300, textAlign: 'center' }}
    >
      <motion.div
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <Icon size={50} color="#1976D2" />
      </motion.div>
      <Typography variant="h5" mt={2}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>
        {message}
      </Typography>
    </Grid>
  );
};

export default EmptyCard;
