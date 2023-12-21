import  React,{ useEffect, useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import{ Grid,Alert }from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StorageIcon from '@mui/icons-material/Storage';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';
import { useSendPasswordResetEmailMutation } from '../../services/userAuthApi';
const defaultTheme = createTheme();

const ResetPassword = () => {
  const [formData, setFormData] = useState({
   
    email: '',
  });

  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const navigate = useNavigate();
  const [sendPasswordResetEmail ,{isLoading}] = useSendPasswordResetEmailMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {  email} = formData;
    let newError = { status: false, msg: '', type: '' };

    if ( !email  ) {
      newError = { status: true, msg: 'Email  Required', type: 'error' };
    }  else {
      const actualData = {
        
        email: email,
      
      };

      // console.log(actualData);
      const res = await sendPasswordResetEmail(actualData);
      console.log(res);
      if (res.data.httpStatus === 202) {
        storeToken(res.data.data)
        navigate('/');
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
            <StorageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SuperShop -Reset Password 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
        
            {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

export default  ResetPassword 