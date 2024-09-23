// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../../AuthContext';

const Signup = ({ selectedRole, onClose }) => {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 
  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend for user registration
      const response = await fetch('http://localhost:9000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });

      // console.log('response is: ', selectedRole)

      if (response.ok) {
        // Registration successful, close the dialog
        const responseData = await response.json();
        const { role } = responseData;
        console.log(responseData)
        signup(role);
        setSuccess(true);
        // onClose();

        console.log('Signup successful!');
      } else {
        // Handle registration failure, show an error message or redirect to an error page
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed.');
        console.error('Signup failed:', errorData);
        setAlertOpen(true);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error during signup:', error);
      setAlertOpen(true);
    }
  };

  return (
  <Box sx={{padding:5, textAlign:'center'}}>
      <Typography variant='h2' color='black'>SingUp</Typography>
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Username"
        name="username"
        autoComplete="name"
        autoFocus
        value={username}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
        autoComplete="new-password"
        value={password}
        onChange={handleChange}
      />
      <Button type="submit" size= "large" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>

      {success && (
        <Alert severity="success" onClose={handleSuccessClose}>
          <AlertTitle>Success</AlertTitle>
          Signup successful! {/* You can customize this message */}
        </Alert>
      )}


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

export default Signup;
