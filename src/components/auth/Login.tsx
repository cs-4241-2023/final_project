import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ username, password });
      navigate('/dashboard')
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default Login;
