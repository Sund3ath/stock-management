import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query/mutations';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface LoginResponse {
  login: {
    accessToken: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation<LoginResponse>(LOGIN);

  const handleLogin = async () => {
    try {
      const result = await login({ variables: { email, password } });
      const token = result.data?.login.accessToken;
      if (token) {
        localStorage.setItem('token', token);
        alert('Login successful!');
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <Container maxWidth="sm" align="center">
      <Box width="100%" 
          maxWidth={400} 
          p={4} 
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          borderRadius={2}
          border="1px solid #ccc"
          sx={{ 
            background: 'linear-gradient(to bottom right, #f0f0f0, #ffffff)',
            boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff'
          }}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          align="center"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && <Typography color="error">{error.message}</Typography>}
      </Box>
    </Container>
  );
};

export default Login;