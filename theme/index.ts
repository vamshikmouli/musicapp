'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#832296', // Deep Purple (Main Color)
      light: '#B351CC', // Soft Purple
      dark: '#511B5C', // Rich Eggplant
      contrastText: '#ffffff', // White text for buttons
    },
    secondary: {
      main: '#9335AC', // Medium Purple
      light: '#E0A6F0', // Very Light Lavender
      dark: '#411649', // Deep Violet
    },
    background: {
      default: '#f7fafc', // Light background
      paper: '#ffffff', // Card background
    },
    text: {
      primary: '#333333', // Default text color
      secondary: '#555555', // Slightly lighter text
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 16,
          borderRadius: 8,
          boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontWeight: 'bold',
          color: '#832296', // Primary Color
          textAlign: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#832296',
          color: 'white',
          '&:hover': {
            backgroundColor: '#722583', // Darker Shade
          },
        },
      },
    },
  },
});

export default theme;
