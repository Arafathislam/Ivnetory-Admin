import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import laptop from '../../img/laptop.png'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { removeToken } from '../../services/LocalStorageService.js';
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});

 
    const navigate = useNavigate();

    // logout button
    
    const handleLogout = () => {
      removeToken('token')
      navigate('/')
    }

    // delete
    const handleDelete = async (e) => {
      e.preventDefault();
      
      try {

        const response = await axios.get(
          `${baseURL}/product/delete/${id}`,
        );
        console.log(response)
        if (response.data.httpStatus === 200) {
          console.log("Product delete successfully");
          navigate("/allproduct");
        } else {
          console.error("Error deleting product product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };



    const fetchProductDetail = async() => {
        await axios.get(`${baseURL}/product/${id}`).then((res) => {
            // console.log(res.data.data, "data")
            setProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchProductDetail()
      }, [id]);



    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
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

                    {/* 2nd part content here */}

                    <Toolbar>
                        {/* Element at the start */}


                        <Typography edge="start" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Product Details
                        </Typography>
                      <form onSubmit={handleDelete}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ ml: 2 }}
                            type="submit"

                        >Delete

                        </Button>
                        </form>
                    </Toolbar>

                    <Box
                        margin={2}
                        bgcolor="white"
                        color=""
                        p={5}

                    >


                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                {/* Content for the first column */}
                                <div style={{}}>

                                    <CardMedia
                                        component="img"
                                        image={product.img}
                                        style={{ borderRadius: '8px' }}
                                        alt="somthing worng"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                {/* Content for the second column */}
                                <div style={{paddingLeft: '20px'}}>
                                
                                    <Typography pt={2} variant="h4">{product.productName}</Typography>
                                    <Typography pt={2} variant="h5">Price: {product.price}tk</Typography>
                                    <Typography pt={2} variant="h5">Store Product <span style={{ color: 'red' }}>{product.daysSinceCreation} </span>days ago</Typography>

                                    <Typography pt={2} variant="body1"> {product.description}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 2 }}>


                                        <Link to={`/updateproduct/${id}`}>

                                            <Button
                                                variant="contained"
                                                size="small"
                                            >Update
                                            </Button>
                                        </Link>







                                    </Box>

                                </div>
                            </Grid>
                        </Grid>


                    </Box>





                </Box>
            </Box>

        </>
    );
}

export default ProductDetail