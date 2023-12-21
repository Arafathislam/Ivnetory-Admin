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
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { removeToken } from '../../services/LocalStorageService.js';
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const UpdateProduct = () => {
  const { id } = useParams();

  const navigation = useNavigate();


  const handleLogout = () => {
    removeToken('token')
    navigation('/')
  }



  
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    img: "",
    description: "",
  });

  const fetchProductDetail = async () => {
    await axios
      .get(`${baseURL}/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

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
        `${baseURL}/product/update/${id}`,
        product
      );
      console.log(response)
      if (response.data.httpStatus === 201) {
        console.log("Product Update successfully");
        navigation("/allproduct");
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
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
                    <Link style={{ textDecoration: "none" }} to="/dashboard">
                      Dashboard
                    </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/allproduct">
                      Product List
                    </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/addproduct">
                      Add Product
                    </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/allreceipt">
                      Receipt
                    </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/user/dailysale"
                    >
                      Sales Report
                    </Link>
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
            <Typography variant="h5">
              Update Your Product Information
            </Typography>

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="productName"
              label="Product Name"
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
              label="Product  Price"
              value={product.price}
              onChange={handleChange}
            />
            <Typography />

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="img"
              label="Image Url"
              value={product.img}
              onChange={handleChange}
            />
            <Typography />

            <TextField
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              sx={{ width: 500 }}
              value={product.description}
              onChange={handleChange}
              variant="outlined"
            />
            <Typography />

            <Typography />

            <Button
              type="submit"
              sx={{ mt: 1, mb: 2, px: 5 }}
              variant="contained"
            >
              Update
            </Button>
          </Box>

          
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;
