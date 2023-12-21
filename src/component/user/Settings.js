import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button,Alert } from "@mui/material";
import { useChangeUserPasswordMutation } from '../../services/userAuthApi';
import { getToken } from "../../services/LocalStorageService";
const drawerWidth = 240;
const Settings = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });
  const token=getToken('token')
  const navigate = useNavigate();
  const [ changeUserPassword,{isLoading}] = useChangeUserPasswordMutation();

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
      const res = await changeUserPassword({actualData,token});
      console.log(res);
      if (res.data.httpStatus === 202) {
        
        navigate('/dashboard');
      } else {
        newError = { status: true, msg: res.data.message, type: 'error' };
      }
    }

    setError(newError);
  };



  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Shop Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/dashboard">Dashboard</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link to="/setting" style={{ textDecoration: 'none' }}>Change Password</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              {/* <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/support">Support </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem> */}
              <Divider />

  



            </List>
          </Box>
        </Drawer>
        <Box
          justifyContent="center"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar />

          {/* 2nd part content here */}
          

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="password-change"
          >
            <Typography variant="h5">
              Change Your Password
            </Typography>

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
            <Typography />

            <Button
              type="submit"
              sx={{ mt: 1, mb: 2, px: 5 }}
              variant="contained"
            >
              Confirm
            </Button>

            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>


        </Box>
      </Box>
    </>
  );
};

export default Settings;