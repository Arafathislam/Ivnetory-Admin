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
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import laptop from "../../img/laptop.png";
import { TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import InputAdornment from '@mui/icons-material/InputAdornment';
// import IconButton from '@mui/icons-material/IconButton';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const ShopingCart = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [saletotalPrice, setSaleTotalPrice] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [sellerDetails, setSellerDetails] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [saleProduct, setSaleProduct] = useState({});
  const [salesid, setSalesId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedList = localStorage.getItem("sales");
    if (storedList) {
      const myList = JSON.parse(storedList);
      setCart(myList);
    } else {
      console.log("No Product Found!");
    }
  }, []);

  useEffect(() => {
    let total = 0;

    for (let product of cart) {
      total += product.totalPrice;
    }

    setSaleTotalPrice(total);
  });

  const handleQuantityChange = (index, newQuantity) => {
    const newCartData = [...cart];
    newCartData[index].quantitySold = newQuantity;
    newCartData[index].totalPrice = newQuantity * newCartData[index].salePrice;
    setCart(newCartData);
    localStorage.setItem("sales", JSON.stringify(newCartData));
  };

  const handleIncreaseQuantity = (index) => {
    handleQuantityChange(index, cart[index].quantitySold + 1);
  };

  const handleDecreaseQuantity = (index) => {
    if (cart[index].quantitySold - 1 < 0) {
      handleQuantityChange(index, 0);
    } else {
      handleQuantityChange(index, cart[index].quantitySold - 1);
    }
  };

  const handleDiscountChange = (e) => {
    let value = e.target.value;
    let fvalue = 0;

    if (value === undefined || value === null) {
      fvalue = 0;
    } else {
      fvalue = parseInt(value);
    }

    setDiscountPercent(fvalue);
  };

  useEffect(() => {
    let dis = saletotalPrice * (discountPercent / 100);
    setDiscount(dis);
    setGrandTotal(saletotalPrice - dis);
  }, [saletotalPrice, discountPercent]);
  

  const removeFromCart = (itemId) => {
    const updatedCartData = cart.filter((item) => item.product_id !== itemId);
    setCart(updatedCartData);
    localStorage.setItem("sales", JSON.stringify(updatedCartData));
  };



  const receiptFromAPi = async () => {
    let receipt = {
      discount: discount,
      soldProducts: ids,
      sellerDetail: sellerDetails,
      customerDetail: customerDetails,
    };

    const response2 = await axios.post(
      `${baseURL}/receipt/create`,
      receipt
    );
    
  };

const dailySaleApi= async()=>{

  try{

 
    for (let item of cart) {
      let dailysale = {
        quantitySold: item.quantitySold,
        salePrice: item.salePrice,
        costPrice:item.price
      };


      const response3= await axios.post(`${baseURL}/sale/createDailySale`,dailysale);
      // console.log("daily",response3);

    }
   

 
    
  }catch(err){
    console.error("Error daily salling product:", err);
  }







}





const productSaleApi =async()=>{

  try{


    for (let item of cart) {
      let productsale = {
        product_id: item.product_id,
        quantitySold: item.quantitySold,
        salePrice: item.salePrice,
        costPrice:item.price
      };


      const response4= await axios.post(`${baseURL}/sale/createProductSale`,productsale);
      // console.log("productSale",response4);


    }
    
  }catch(err){
    console.error("Error all salling product:", err);
  }






}


// send sms

const sendSmsAPi =async()=>{

  try{

    let smsData = {
      msg: `Thank you for choosing our products at Supershop. Your purchase has been successfully completed, and the total amount is ${grandtotal} Tk. We appreciate your business.`,
      phn:phone
    };


    const response5= await axios.post(`${baseURL}/sms`,smsData);
    // console.log("daily",response3);

  }catch(err){
    console.error("Error sms", err);
  }


}


  const ids = [];
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {



      
      for (let item of cart) {
        let saleproduct = {
          product_id: item.product_id,
          quantitySold: item.quantitySold,
          salePrice: item.salePrice,
          productName:item.productName
        };


        let response = await axios.post(
          `${baseURL}/sale/addsale`,
          saleproduct
        );
        console.log( response.data.data._id);

        let sale = { sale_id: response.data.data._id };
        ids.push(sale);
      }

    //  console.log(ids)
      // api 2 for create receipt
      receiptFromAPi();

      // ap3 for daily sale

      dailySaleApi();

      //api4 for daily sale

      productSaleApi();

      // api5 for sms
      sendSmsAPi();
      

      localStorage.removeItem("sales");

      navigate("/allproduct");
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
                    <Link style={{ textDecoration: 'none' }}  to="/dashboard">Dashboard</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link  style={{ textDecoration: 'none' }}  to="/allproduct">Product List</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }}  to="/allproduct">Add Product</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }}  to="/allreceipt">Receipt</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: 'none' }}  to="/dailysale">Sales Report</Link>
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

          {/* 2nd part csalesidontent here */}

          <Typography component="div" variant="h4" sx={{ m: 2, p: 2 }}>
            Shopping Cart
          </Typography>

          {/* cart start */}

          {cart &&
            cart.map((product, index) => (
              <Card
                key={product.product_id}
                sx={{ display: "flex", width: "60%", alignItems: "center" }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={laptop}
                  alt="Live from space album cover"
                />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {product.productName}
                    </Typography>
                  </CardContent>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Quantity:
                    </Typography>
                  </CardContent>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      sx={{ width: 150 }}
                      name="quantitySold"
                      value={product.quantitySold}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          // <InputAdornment position="start">
                          //    <IconButton
                          //     size="small"
                          //     onClick={() => handleIncreaseQuantity(index)}
                          //   >
                          //     <ArrowUpwardIcon />
                          //   </IconButton>
                          //   <IconButton
                          //     size="small"
                          //     onClick={() => handleDecreaseQuantity(index)}
                          //   >
                          //     <ArrowDownwardIcon />
                          //   </IconButton> 
                          // </InputAdornment>

                          
                          <div>
                          
                          <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <button
                              style={{ padding: '4px', cursor: 'pointer' }}
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              &#9650; {/* Unicode character for upward arrow */}
                            </button>
                            <button
                              style={{ padding: '4px', cursor: 'pointer' }}
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              &#9660; {/* Unicode character for downward arrow */}
                            </button>
                          </span>
                        </div>


                        ),
                      }}
                    />
                  </CardContent>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Total Price : {product.totalPrice} TK
                    </Typography>
                  </CardContent>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Link>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => removeFromCart(product.product_id)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </Link>
                  </CardContent>
                </Box>
              </Card>
            ))}

          {/* toal bill card */}
          <Typography />

          <Divider sx={{ width: "60%" }} />





    <Typography component="div" variant="body" sx={{ width: "60%" }}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
      id="add-cart"
    >
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell align="right">
                <TextField
                  required
                  margin="normal"
                  sx={{ borderRadius: "20px", width: "25%" }}
                  id="name"
                  name="discount"
                  label="Discount "
                  onChange={handleDiscountChange}
                />
                <Typography />
              </TableCell>
              <TableCell align="right">{discount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{grandtotal}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Invoiced To:</TableCell>
              <TextField
                required
                margin="normal"
                sx={{ borderRadius: "20px", width: "100%" }}
                id="seller"
                name="sellerDetails"
                label="Seller Details "
                value={sellerDetails}
                onChange={e => setSellerDetails(e.target.value)}
              />
            </TableRow>

            <TableRow>
              <TableCell>Pay To:</TableCell>
              <TextField
                required
                margin="normal"
                sx={{ borderRadius: "20px", width: "100%" }}
                id="customer"
                name="customerDetails"
                label="Customer details"
                value={customerDetails}
                onChange={e => setCustomerDetails(e.target.value)}
              />
            </TableRow>
            


            <TableRow>
              <TableCell>Phone Number:</TableCell>
              <TextField
                required
                margin="normal"
                sx={{ borderRadius: "20px", width: "100%" }}
                id="customer"
                name="phone"
                label="+880"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </TableRow>



          </TableBody>
        </Table>
      </TableContainer>

      <Button
        type="submit"
        sx={{ mt: 2, mb: 2, px: 5 }}
        variant="contained"
      >
        Sell
      </Button>
    </Box>
  </Typography>
  
 
  


         




        </Box>
      </Box>
    </>
  );
};

export default ShopingCart;