'use client';
import { Typography, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 0.5,
        borderRadius: 1,
        boxShadow: 2,
        marginBottom: 0.5,
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'primary.main',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
