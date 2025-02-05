'use client';
import { Typography, Paper, Box } from '@mui/material';

interface HeaderProps {
  title: string;
  totalCount: number;
}

const Header = ({ title, totalCount }: HeaderProps) => {
  return (
    <Paper
      sx={{
        backgroundColor: '#f5f5f5',
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between', // Align title left, count right
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        {title}
      </Typography>

      {/* Total Count */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        {totalCount}
      </Typography>
    </Paper>
  );
};

export default Header;
