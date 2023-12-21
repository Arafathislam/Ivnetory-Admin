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
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;
const Support = () => {
  const { id } = useParams();

  const navigation = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    img: "",
    description: "",
  });

  const fetchProductDetail = async () => {
    await axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data.result);
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
      const response = await axios.put(
        `http://localhost:8000/api/product/update/${id}`,
        product
      );

      if (response.status === 201) {
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

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }} to="/support">Support </Link>
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
          

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="add-product"
          >
            <Typography variant="h5">
              User Feedback Report
            </Typography>

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="topic"
              name="topic"
              label="Enter your Problem"
              value={product.productName}
              onChange={handleChange}
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

            <Button
              type="submit"
              sx={{ mt: 1, mb: 2, px: 5 }}
              variant="contained"
            >
              Send
            </Button>
          </Box>


        </Box>
      </Box>
    </>
  );
};

export default Support;