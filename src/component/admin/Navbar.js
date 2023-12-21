import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { removeTokenAdmin } from '../../services/LocalStorageService.js';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

// logout button

const handleLogout = () => {
  removeTokenAdmin('admin')
  navigate('/')
}





  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Admin
      </Typography>
      <Divider />
      <List>
      
          <ListItem  disablePadding>
            <Link to='/details' style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              User Details
            </ListItemButton>
            </Link>
          </ListItem>

          <ListItem  disablePadding>
          <Link to='/monitor' style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              User Activity
            </ListItemButton>
            </Link>
          </ListItem>

          <ListItem  disablePadding>
          <Link to='/file' style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              File Upload
            </ListItemButton>
            </Link>
          </ListItem>

          <ListItem  disablePadding>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              Add User
            </ListItemButton>
            </Link>
          </ListItem>



          <ListItem  disablePadding>
          <Link to='/changepass' style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              Change Password
            </ListItemButton>
            </Link>
          </ListItem>


          <ListItem  disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
              LogOut
            </ListItemButton>
          </ListItem>
    
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Admin
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link to='/details' style={{ textDecoration: 'none' }}>
              <Button  sx={{ color: '#fff' }}>
              User Details
              </Button>
              </Link>
              <Link to='/monitor' style={{ textDecoration: 'none' }}>
              <Button  sx={{ color: '#fff' }}>
               
                User Activity

              </Button>
              </Link>
          {/* <Link to='/file' style={{ textDecoration: 'none' }}>

              <Button  sx={{ color: '#fff' }}>
                File Upload
              </Button>
              </Link> */}

              <Link to='/signup' style={{ textDecoration: 'none' }}>

              <Button  sx={{ color: '#fff' }}>
                Add User
              </Button>
              
            </Link>


            <Link to='/changepass' style={{ textDecoration: 'none' }}>
              <Button  sx={{ color: '#fff' }}>
                Change Password
              </Button>
              </Link>

           
              <Button onClick={handleLogout}  sx={{ color: '#fff' }}>
                LogOut
              </Button>
             
   
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
   <Box>






   </Box>
      </Box>
    </Box>
  );
}



Navbar.propTypes = {

  window: PropTypes.func,
};

export default Navbar;