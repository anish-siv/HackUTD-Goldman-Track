import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import {
  Security,
  Speed,
  AccountBalance,
  TrendingUp,
  School,
  Shield,
  Support,
  Apple,
  Android
} from '@mui/icons-material';
import { Navbar } from './Navbar';

interface SplashPageProps {
  onGetStarted: () => void;
}

export const SplashPage = ({ onGetStarted }: SplashPageProps) => {
  const features = [
    {
      icon: <Security fontSize="large" color="primary" />,
      title: 'Secure Banking',
      description: 'State-of-the-art security measures to protect your finances'
    },
    {
      icon: <Speed fontSize="large" color="primary" />,
      title: 'Fast Transactions',
      description: 'Instant deposits and withdrawals at your fingertips'
    },
    {
      icon: <TrendingUp fontSize="large" color="primary" />,
      title: 'Financial Growth',
      description: 'Tools and insights to help your money grow'
    },
    {
      icon: <AccountBalance fontSize="large" color="primary" />,
      title: 'Modern Banking',
      description: 'Next-generation banking for the digital age'
    }
  ];

  return (
    <Box>
      <Navbar 
        isLoggedIn={false} 
        onGetStarted={onGetStarted}
        isSplashPage={true}
      />
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 15,
          pb: 8,
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={4} 
            alignItems="center"
            justifyContent="center"
          >
            <Grid 
              item 
              xs={12} 
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                textAlign="center"
              >
                Welcome to Modern Banking
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 6,
                  maxWidth: '800px',
                  margin: '0 auto'
                }}
              >
                Experience seamless financial management with our cutting-edge platform
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  mt: 4,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ my: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Learn & Grow
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <School fontSize="large" color="primary" />
              <Typography variant="h6" gutterBottom>
                Financial Literacy
              </Typography>
              <Typography>
                Free courses on budgeting, saving, and investing basics
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <TrendingUp fontSize="large" color="primary" />
              <Typography variant="h6" gutterBottom>
                Investment Guidance
              </Typography>
              <Typography>
                Simple investment options for every budget
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Shield fontSize="large" color="primary" />
              <Typography variant="h6" gutterBottom>
                Fraud Protection
              </Typography>
              <Typography>
                Advanced security to keep your money safe
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          We're Here to Help
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Support fontSize="large" color="primary" />
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography>
                Get help anytime via chat, phone, or email
              </Typography>
            </Paper>
          </Grid>
          {}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'primary.light', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" color="white" gutterBottom>
                Bank Anywhere, Anytime
              </Typography>
              <Typography variant="h6" color="white" sx={{ mb: 4 }}>
                Download our mobile app for easy access to your finances
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Apple />}
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  App Store
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<Android />}
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                >
                  Play Store
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/path/to/mobile-app-preview.png"
                sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};