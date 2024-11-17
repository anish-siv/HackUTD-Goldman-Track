import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
  Container,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  AccountBalance,
  Person,
  ExitToApp,
  AccountCircle,
  ArrowUpward,
  ArrowDownward,
  School,
  TrendingUp,
  Shield,
  Apple,
  Android,
  Support
} from '@mui/icons-material';

interface NavbarProps {
  userEmail?: string;
  userName?: string;
  onLogout?: () => void;
  onGetStarted?: () => void;
  isLoggedIn: boolean;
  isSplashPage?: boolean;
}

export const Navbar = ({ 
  userEmail, 
  userName, 
  onLogout, 
  onGetStarted, 
  isLoggedIn, 
  isSplashPage 
}: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout?.();
  };

  // Splash page styles
  const splashStyles = {
    appBar: {
      backgroundColor: 'transparent',
      color: 'white',
      boxShadow: 'none'
    },
    logo: {
      color: 'white'
    },
    button: {
      color: 'white',
      borderColor: 'white',
      '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={isSplashPage ? splashStyles.appBar : undefined}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <AccountBalance 
            sx={{ 
              mr: 2, 
              color: isSplashPage ? splashStyles.logo.color : 'inherit' 
            }} 
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: isSplashPage ? splashStyles.logo.color : 'inherit',
              fontWeight: 'bold'
            }}
          >
            FinTech Financial Services 
          </Typography>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Welcome, {userName || 'User'}
              </Typography>
              
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Person sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined"
                onClick={onGetStarted}
                sx={isSplashPage ? splashStyles.button : undefined}
              >
                Login
              </Button>
              
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 