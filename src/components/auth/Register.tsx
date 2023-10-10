import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = async (): Promise<boolean> => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, contain an uppercase and lowercase letter, and a number.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    const checkUsername = await authService.checkUsername(username);
    if (typeof checkUsername === 'string') {
      setError(checkUsername);
      return false;
    }
    return checkUsername;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setError("")
    e.preventDefault();

    const validForm = await validateForm();
    if (!validForm) {
      return;
    }
    else {
      try {
        await authService.register({
          username,
          password,
          confirmPassword,
          firstName,
          lastName
        });
        navigate('/dashboard');
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </form>
  );
};

export default Register;
