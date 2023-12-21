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
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import laptop from "../../img/laptop.png";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { removeToken } from '../../services/LocalStorageService.js';
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalpage, setTotalPage] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

// logout button

const handleLogout = () => {
  removeToken('token')
  navigate('/')
}



  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If the search query is empty, reset to showing all products
      setFilteredProducts([]);
    } else {
      // Filter products based on the search query
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to the first page when performing a search
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Fetch products
  const fetchProducts = async (pageNumber, itemsPerPage) => {
    try {
      const response = await axios.get(
        `${baseURL}/product?page=${pageNumber}&limit=${itemsPerPage}`
      );

      const data = await response.data;
      const products = data.data.result;
      setProducts(products);
      setTotalPage(data.total_page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage]);

  // Get cart products
  useEffect(() => {
    const storedList = localStorage.getItem("sales");
    if (storedList) {
      const myList = JSON.parse(storedList);
      const itemCount = myList.length;
      setCount(itemCount);
    } else {
      setCount(0);
    }
  }, []);

  function ShoppingCart() {
    return (
      <Badge
        badgeContent={count}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <ShoppingCartIcon />
      </Badge>
    );
  }

  const displayedProducts = searchQuery ? filteredProducts : products;

  
  const pageCount = Math.ceil(totalpage / itemsPerPage);

  // Handle page changes
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
            <Typography
              edge="start"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            
            >
              Shop Management
            </Typography>
            <Link to="/cart">
              <Button color="inherit">
                <ShoppingCart />
              </Button>
            </Link>
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
                      to="/dailysale"
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
        <Box justifyContent="center" component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <TextField
              label="Search Your Product"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{ borderRadius: "20px", width: "50%" }}
            />
            <IconButton
              color="primary"
              aria-label="Search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {displayedProducts.map((product) => (

              <Card
                key={product._id}
                sx={{ maxWidth: 200, margin: "10px", padding: "10px" }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={`/stockupdate/${product._id}`}>
                      <AddBoxIcon color="primary" />
                    </Link>
                  </Grid>
                </Grid>
                <CardMedia
                  component="img"
                  image={product.img}
                  style={{ borderRadius: '8px' }}
                  alt="Something wrong"
                />
                <CardContent>
                  <Link
                    to={`/productdetail/${product._id}`}
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    {product.productName}
                  </Link>
                  <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "10px" }}>
                    Price: {product.price} Tk
                  </Typography>
                  <Link to={`/saleproduct/${product._id}`}>
                    <Button variant="contained" size="small" style={{ pt: 5 }}>
                      Add to cart
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center" height="20vh">
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AllProduct;
