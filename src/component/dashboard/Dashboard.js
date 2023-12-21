import * as React from "react";
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
import { Link } from "react-router-dom";
import Inventorydash from "./Inventorydash.js";
import { removeToken } from '../../services/LocalStorageService.js';
import { useNavigate } from 'react-router-dom';
import Test from "./Test.js";
const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    removeToken('token')
    navigate('/')
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6"  noWrap component="div">
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
                    <Link to="/allproduct" style={{ textDecoration: 'none' }}>Product List</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/allproduct">Add Product</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/allreceipt">Receipt</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/dailysale">Sales Report</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/setting">Settings</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} >Logout</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
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
          <Inventorydash />
         
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
