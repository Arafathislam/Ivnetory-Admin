import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { removeToken } from '../../services/LocalStorageService.js';
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const SaleProduct = () => {
  const { id } = useParams();

  const navigation = useNavigate();
  const [stock, setStock] = useState({});
  const [cart, setCart] = useState({});
  const [quantity, setQuantity] = useState({});
  const [price, setPrice] = useState({});
  const [product, setProduct] = useState({});

  const fetchStockDetail = async () => {
    await axios
      .get(`${baseURL}/stock/${id}`)
      .then((res) => {
        setStock(res.data.data);
        // console.log("stock",res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // stock data

  useEffect(() => {
    fetchStockDetail();
  });

  // retrive data from local store

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    setCart(sales);
  }, []);

  // fatch single data

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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
  };
  const sale = {
    product_id: id,
    productName: product.productName,
    price: product.price,
    quantitySold: quantity,
    salePrice: price,
    img: product.img,
    totalPrice: quantity * price,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCart = [...cart, sale];
    localStorage.setItem("sales", JSON.stringify(finalCart));
    navigation("/allproduct");

    try {
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
                    <Link style={{ textDecoration: "none" }}to="/dashboard">Dashboard</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }}to="/allproduct">Product List</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/addproduct">Add Product</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/allreceipt">Receipt</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/dailysale">Sales Report</Link>
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
            <Typography variant="h5">Sale Product</Typography>

            <Typography pt={2} variant="subtitle1">
              Product Avaliable: {stock.stockQuantity} pcs
            </Typography>
            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="quantitySold"
              // value={sellProduct.quantitySold}
              label=" Quantity"
              helperText="Number of product."
              onChange={handleQuantityChange}
            />
            <Typography />

            <TextField
              required
              margin="normal"
              sx={{ borderRadius: "20px", width: "50%" }}
              id="name"
              name="salePrice"
              // value={sellProduct.salePrice}
              onChange={handlePriceChange}
              label="Price"
              helperText="Per unit product price"
            />
            <Typography />

            <Typography />

            <Button
              type="submit"
              sx={{ mt: 1, mb: 2, px: 5 }}
              variant="contained"
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SaleProduct;
