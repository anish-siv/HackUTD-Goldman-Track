import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
  Alert
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import api from '../services/api';

interface RegisterProps {
  onRegister: (email: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export const Register = ({ onRegister, onSwitchToLogin }: RegisterProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        balance: 0
      });
      onRegister(response.email, response.name);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <PersonAdd sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              Register
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<PersonAdd />}
          >
            Register
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={onSwitchToLogin}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};