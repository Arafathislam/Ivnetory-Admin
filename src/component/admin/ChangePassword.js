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
import { useChangeAdminPasswordMutation } from '../../services/userAuthApi';
import { getTokenAdmin } from '../../services/LocalStorageService';
const defaultTheme = createTheme();

const ChnagePassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
      });
    
      const [error, setError] = useState({
        status: false,
        msg: '',
        type: '',
      });
      const token=getTokenAdmin('admin')
      const navigate = useNavigate();
      const [ changeAdminPassword,{isLoading}] = useChangeAdminPasswordMutation();
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { password, confirmPassword } = formData;
        let newError = { status: false, msg: '', type: '' };
    
        if ( !password || !confirmPassword) {
          newError = { status: true, msg: 'All Fields are Required', type: 'error' };
        } else if (password !== confirmPassword) {
          newError = { status: true, msg: "Password and Confirm Password Don't Match", type: 'error' };
        } else {
          const actualData = {
            
            password: password,
            password_confirmation:confirmPassword
          };
    
          // console.log(actualData);
          const res = await changeAdminPassword({actualData,token});
          console.log(res);
          if (res.data.httpStatus === 202) {
            
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
            Change Password
          </Typography>
          <form onSubmit={handleSubmit}>


            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label=" New Password"
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
              Submit
            </Button>
          
          </form>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChnagePassword;
