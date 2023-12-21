import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { removeToken } from '../../services/LocalStorageService.js';
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/product/create`,
        product
      );
      console.log(response);

      if (response.data.httpStatus === 201) {
        console.log("Product added successfully");
        navigate("/dashboard");
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const buttonEnable =
    product.productName !== "" &&
    product.price !== "" &&
    product.img !== "" &&
    product.description !== "";



//logout button 

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

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="add-product"
          >
            <Typography variant="h5">Add Your Product</Typography>

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="productName"
              label="Product Name"
              helperText="Enter Product Name."
              value={product.productName}
              onChange={handleChange}
            />
            <Typography />

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="price"
              value={product.price}
              onChange={handleChange}
              label="Product  Price"
              helperText="Enter a product price."
            />
            <Typography />

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="img"
              value={product.img}
              onChange={handleChange}
              label="Image Url"
              helperText="Enter image url"
            />
            <Typography />

            <TextField
              id="description"
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ width: 815 }}
              variant="outlined"
              helperText="Enter a description for your item."
            />
            <Typography />

            <Typography />

            <Button
              disabled={!buttonEnable}
              type="submit"
              sx={{ mt: 1, mb: 2, px: 5 }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
