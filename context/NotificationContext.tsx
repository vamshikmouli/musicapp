'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    message: string,
    type: NotificationType = 'info'
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3s
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top-right
        >
          <Alert
            severity={notification.type}
            onClose={() => setNotification(null)}
            variant="filled" // Makes it look better
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  return context;
};
