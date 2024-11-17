import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SplashPage } from './components/SplashPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleLogin = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleGetStarted = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showSplash ? (
        <SplashPage onGetStarted={handleGetStarted} />
      ) : !isLoggedIn ? (
        showRegister ? (
          <Register onRegister={handleLogin} onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
        )
      ) : (
        <Dashboard userEmail={userEmail} userName={userName} />
      )}
    </ThemeProvider>
  );
}

export default App;