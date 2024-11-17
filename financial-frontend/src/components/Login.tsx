import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert 
} from '@mui/material';
import api from '../services/api';

interface LoginProps {
  onLogin: (email: string, name: string) => void;
  onSwitchToRegister: () => void;
}

export const Login = ({ onLogin, onSwitchToRegister }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.login({
        email: formData.email,
        password: formData.password
      });
      onLogin(response.email, response.name);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />

          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <Button
            onClick={onSwitchToRegister}
            fullWidth
            color="secondary"
            disabled={isLoading}
          >
            Don't have an account? Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}; 