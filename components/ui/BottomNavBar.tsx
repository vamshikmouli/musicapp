'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/Money';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { usePathname, useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  const pathToIndex: { [key: string]: number } = {
    '/home': 0,
    '/schools': 1,
    '/staff': 2,
    '/attendance': 3,
    '/fee': 4,
  };

  useEffect(() => {
    setValue(pathToIndex[pathname] ?? 0);
  }, [pathname]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          const routes = ['/home', '/schools', '/staff', '/attendance', '/fee'];
          router.push(routes[newValue]);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Schools" icon={<SchoolIcon />} />
        <BottomNavigationAction label="Staff" icon={<PersonIcon />} />
        <BottomNavigationAction label="Attendance" icon={<CreditScoreIcon />} />
        <BottomNavigationAction label="Fee" icon={<MoneyIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
