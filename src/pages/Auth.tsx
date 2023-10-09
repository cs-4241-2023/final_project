import React, { useState } from 'react';
import { Login, Register } from '../components/auth';
import { Button, Container, Paper, Box } from '@mui/material';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          {isLogin ? (
            <div>
              <Login />
              <Button onClick={toggleForm} fullWidth>
                Switch to Register
              </Button>
            </div>
          ) : (
            <div>
              <Register />
              <Button onClick={toggleForm} fullWidth>
                Switch to Login
              </Button>
            </div>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
