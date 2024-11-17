import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container,
  Grid,
  Paper 
} from '@mui/material';
import api from '../services/api';
import { Navbar } from './Navbar';

interface DashboardProps {
  userEmail: string;
  userName: string;
}

export const Dashboard = ({ userEmail, userName }: DashboardProps) => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.getUser(userEmail);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    if (userEmail) {
      fetchBalance();
    }
  }, [userEmail]);

  const handleDeposit = async () => {
    try {
      await api.deposit(userEmail, Number(amount));
      const response = await api.getUser(userEmail);
      setBalance(response.data.balance);
      alert('Deposit successful!');
      setAmount('');
    } catch (error) {
      alert('Deposit failed!');
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await api.withdraw(userEmail, Number(amount));
      const response = await api.getUser(userEmail);
      setBalance(response.data.balance);
      alert('Withdrawal successful!');
      setAmount('');
    } catch (error) {
      alert('Withdrawal failed!');
      console.error(error);
    }
  };

  return (
    <Box>
      <Navbar 
        isLoggedIn={true}
        userEmail={userEmail}
        userName={userName}
        onLogout={() => {
          window.location.reload();
        }}
      />
      
      <Container maxWidth="md" sx={{ pt: 10 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Banking Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5">
                  Current Balance: ${balance?.toFixed(2) || '0.00'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleDeposit}
                  >
                    Deposit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};