import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import {Grid, Alert  }from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
const defaultTheme = createTheme();

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const navigate = useNavigate();
  const [registerUserMutation,{isLoading}] = useRegisterUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    const { username, password, confirmPassword } = formData;
    let newError = { status: false, msg: '', type: '' };

    if (!username  || !password || !confirmPassword) {
      newError = { status: true, msg: 'All Fields are Required', type: 'error' };
    } else if (password !== confirmPassword) {
      newError = { status: true, msg: "Password and Confirm Password Don't Match", type: 'error' };
    } else {
      const actualData = {
        username: username,
        password: password,
        password_confirmation:confirmPassword
      };

      // console.log(actualData);
      const res = await registerUserMutation(actualData);
      // console.log(res);
      if (res.data.message === 'Success') {
        navigate('/details');
      } else {
        newError = { status: true, msg: res.data.message, type: 'error' };
      }
    }

    setError(newError);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <form onSubmit={handleRegistration}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
  
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          
          </form>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
