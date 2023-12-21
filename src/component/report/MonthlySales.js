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
import { TextField, Button } from "@mui/material";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const MonthlySales = () => {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState({});
  const data = {
    date: new Date(date).toLocaleDateString(),
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setDate(value);
  };

  const fetchProductDetail = async () => {
    try {
      const response = await axios.post(`${baseURL}/sale/monthlysale`, {
        date,
      });
      setProduct(response.data.data[0]);
    } catch (err) {
      console.error("Error getting monthly product", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProductDetail();
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
                    <Link style={{ textDecoration: "none" }} to="/dailysale">
                      Daily Sales
                    </Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Link style={{ textDecoration: "none" }} to="/monthlysale">
                      Monthly Sales
                    </Link>
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
          <Box component="div" noValidate sx={{ mt: 1 }} id="add-product">
            <Typography variant="h5">Monthly Sales</Typography>
            <Box sx={{ mt: 3 }}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  type="date"
                  variant="outlined"
                  width="%50%"
                  sx={{ paddingBottom: "16px", paddingRight: "5px" }}
                  onChange={handleChange}
                  value={date}
                />
                <Button
                  variant="contained"
                  sx={{ padding: "15px" }}
                  color="primary"
                  type="submit"
                >
                  Report
                </Button>
              </Box>
              <div className="overflow-view">
                <div className="invoice-body">
                  <table>
                    <thead>
                      <tr>
                        <td className="text-bold">SI No</td>
                        <td className="text-bold">Product Name</td>
                        <td className="text-bold">QTY</td>
                        <td className="text-bold">Total Cost Price</td>
                        <td className="text-bold">Total Sale Price</td>
                        <td className="text-bold">Profit</td>
                        <td className="text-bold">Loss</td>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {product &&
                        Object.values(product.products).map((p, index) => (
                          <tr key={p.product_id}>
                            <td>{index + 1}</td>
                            <td>{p.productName}</td>
                            <td>{p.totalUnitsSold}</td>
                            <td>${p.totalCostPrice}</td>
                            <td>${p.totalSalePrice}</td>
                            <td>${p.totalProfit}</td>
                            <td>${p.totalLoss}</td>
                          </tr>
                        ))}
                    </tbody> */}

<tbody>
  {product && product.products && Object.values(product.products).length > 0 ? (
    Object.values(product.products).map((p, index) => (
      <tr key={p.product_id}>
        <td>{index + 1}</td>
        <td>{p.productName}</td>
        <td>{p.totalUnitsSold}</td>
        <td>${p.totalCostPrice || 0}</td>
        <td>${p.totalSalePrice || 0}</td>
        <td>${p.totalProfit || 0}</td>
        <td>${p.totalLoss || 0}</td>
      </tr>
    ))
  ) : null}
</tbody>



                  </table>


                  
                  {/* <div className="invoice-body-bottom">
                    <div className="invoice-body-info-item border-bottom">
                      <div className="info-item-td text-end text-bold">
                        Sub Total Cost Price :
                      </div>
                      <div className="info-item-td text-end">
                        $
                        {product.totalCostPrice !== undefined
                          ? product.totalCostPrice
                          : 0}
                      </div>
                    </div>
                    <div className="invoice-body-info-item border-bottom">
                      <div className="info-item-td text-end text-bold">
                        Sub Total Sale Price :
                      </div>
                      <div className="info-item-td text-end">
                        ${product.totalSalePrice}
                      </div>
                    </div>
                    <div className="invoice-body-info-item border-bottom">
                      <div className="info-item-td text-end text-bold">
                        Sub Total Quantity :
                      </div>
                      <div className="info-item-td text-end">
                        {product.totalUnitsSold || 0}
                      </div>
                    </div>
                    <div className="invoice-body-info-item border-bottom">
                      <div className="info-item-td text-end text-bold">
                        Profit :
                      </div>
                      <div className="info-item-td text-end">
                        ${product.totalProfit || 0}
                      </div>
                    </div>
                    <div className="invoice-body-info-item">
                      <div className="info-item-td text-end text-bold">
                        Loss :
                      </div>
                      <div className="info-item-td text-end">
                        ${product.totalLoss || 0}
                      </div>
                    </div>
                  </div> */}


<div className="invoice-body-bottom">
  <div className="invoice-body-info-item border-bottom">
    <div className="info-item-td text-end text-bold">
      Sub Total Cost Price:
    </div>
    <div className="info-item-td text-end">
      ${product && product.totalCostPrice !== undefined ? product.totalCostPrice : 0}
    </div>
  </div>
  <div className="invoice-body-info-item border-bottom">
    <div className="info-item-td text-end text-bold">
      Sub Total Sale Price:
    </div>
    <div className="info-item-td text-end">
      ${product && product.totalSalePrice !== undefined ? product.totalSalePrice : 0}
    </div>
  </div>
  <div className="invoice-body-info-item border-bottom">
    <div className="info-item-td text-end text-bold">
      Sub Total Quantity:
    </div>
    <div className="info-item-td text-end">
      {product ? product.totalUnitsSold || 0 : 0}
    </div>
  </div>
  <div className="invoice-body-info-item border-bottom">
    <div className="info-item-td text-end text-bold">
      Profit:
    </div>
    <div className="info-item-td text-end">
      ${product && product.totalProfit !== undefined ? product.totalProfit : 0}
    </div>
  </div>

  
  <div className="invoice-body-info-item">
    <div className="info-item-td text-end text-bold">
      Loss:
    </div>
    <div className="info-item-td text-end">
      ${product && product.totalLoss !== undefined ? product.totalLoss : 0}
    </div>
  </div>
</div>





                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MonthlySales;
