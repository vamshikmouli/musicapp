'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Session } from 'next-auth';
import theme from '@/theme';
import { NotificationProvider } from '@/context/NotificationContext';

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <NotificationProvider>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </NotificationProvider>
  );
}
