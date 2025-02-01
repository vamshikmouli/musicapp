'use client';

import { loginWithCreds } from '@/actions/authentication/auth';
import AuthButton from './AuthButton';
import LNSTextField from './ui/LNSTextField';
import { Box, Card, CardContent, Typography } from '@mui/material';
import theme from '@/theme';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const response = await loginWithCreds(formData);
    if (response?.error) {
      setServerError(response.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 4,
            boxShadow: 6,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              boxShadow: 10,
              transform: 'scale(1.02)',
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
            >
              Sign In
            </Typography>
            {serverError && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {serverError}
              </Typography>
            )}
            <LNSTextField
              label="Email"
              type="email"
              placeholder="Enter your email"
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                borderRadius: 1,
              }}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <LNSTextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                borderRadius: 1,
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box mt={2} display="flex" justifyContent="center">
              <AuthButton loading={loading} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </form>
  );
};

export default LoginForm;
