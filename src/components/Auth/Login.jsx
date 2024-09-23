// Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Login = ( {selectedRole}) => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend for authentication
      const response = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });
      
      console.log('role is', selectedRole)
      if (response.ok) {
        // login();
        // Authentication successful, close the dialog
        const { token, userId, role } = await response.json();
        login(token, userId, role);
        // document.cookie = `authToken=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`;
        Cookies.set('token', token, { expires: 7, secure: true });
        console.log('tokensaved', token)

        console.log('Login successful!');
        if (role === 'buyer') {
          navigate('/auction-platform'); // Change to your buyer dashboard route
        } else if (role === 'seller') {
          navigate('/seller-platform'); // Change to your seller dashboard route
        }
      } else {
        // Handle authentication failure, show an error message or redirect to an error page
        const errorData = await response.json();
        console.error('Login failed!', errorData);
        setError(errorData.message || 'Signup failed.');
        setAlertOpen(true);
      }
    } catch (error) {
      setAlertOpen(true);
      console.error('Error during login:', error);
    }
  };

  return (<Box sx={{padding:5, textAlign:'center'}}>
      <Typography variant='h2' color='black'>Login</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handleChange}
        />
        <Button type="submit" size='large' variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
        {error && (
          <Alert severity="error" onClose={handleAlertClose} open={alertOpen}>
              <AlertTitle>Error</AlertTitle>
              {error}
          </Alert>
          )}
      </form>
    </Box>
  );
};

export default Login;
