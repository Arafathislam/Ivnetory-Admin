import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import axios from "axios";
import "../receipt/style.css";
const invoice = require("../../img/invoice.jpg");
const baseURL = process.env.REACT_APP_BACKEND_URL;
const drawerWidth = 240;

const AllReceipt = () => {
  const componentPDFRefs = useRef([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  
 

  const handlePrint = (receiptNumber) => {
    const printContent = document.getElementById(`print-area-${receiptNumber}`);
    if (printContent) {
      const originalContents = document.body.innerHTML;

      // Replace the page content with the content of the receipt
      document.body.innerHTML = printContent.innerHTML;

      // Print the modified page
      window.print();

      // Restore the original page content
      document.body.innerHTML = originalContents;
    } else {
      console.error(
        `Print area with ID 'print-area-${receiptNumber}' not found.`
      );
    }

  
  };

  function convertToDdMmYy(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString().slice(2);

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchProducts = async (pageNumber, itemsPerPage) => {
    try {
      const response = await axios.get(
        `${baseURL}/receipt?page=${pageNumber}&limit=${itemsPerPage}`
      );

      const { results, total_page } = response.data.data;

      const updatedProducts = await Promise.all(
        results.map(async (product) => {
          const soldProductDetails = await fetchSoldProductDetails(
            product.soldProducts
          );
          return { ...product, soldProductDetails };
        })
      );

      setAllProducts(updatedProducts);
      setTotalPages(total_page);
    } catch (error) {
      console.error("Error fetching Receipt:", error);
    }
  };

  
  const fetchSoldProductDetails = async (soldProductIds) => {
    const soldProductDetails = await Promise.all(
      soldProductIds.map(async (soldProductId) => {
        try {
          const response = await axios.get(
            `${baseURL}/sale/${soldProductId.sale_id}`
          );
          return response.data.data;
        } catch (error) {
          console.error("Error fetching sold product details:", error);
          return null;
        }
      })
    );

    return soldProductDetails.filter((details) => details !== null);
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
                    <Link style={{ textDecoration: "none" }} to="/dailysale">
                      Sales Report
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

          {/* 2nd part content here */}

          {/* receipt part */}

          {allProducts &&
            allProducts.map((product, index) => (
              <div
                className="invoice-wrapper"
                id={`print-area-${product.receiptNumber}`}
                key={index}
              >
                <div className="invoice">
                  <div className="invoice-container">
                    <div className="invoice-head">
                      <div className="invoice-head-top">
                        <div className="invoice-head-top-left text-start">
                          <img src={invoice} alt="invoice" />
                        </div>
                        <div className="invoice-head-top-right text-end">
                          <h3>Invoice</h3>
                        </div>
                      </div>
                      <div className="hr"></div>
                      <div className="invoice-head-middle">
                        <div className="invoice-head-middle-left text-start">
                          <p>
                            <span className="text-bold">Date</span>:{" "}
                            {convertToDdMmYy(product.createdAt)}
                          </p>
                        </div>
                        <div className="invoice-head-middle-right text-end">
                          <p>
                            <span className="text-bold">Invoice No:</span>
                            {product.receiptNumber}
                          </p>
                        </div>
                      </div>
                      <div className="hr"></div>
                      <div className="invoice-head-bottom">
                        <div className="invoice-head-bottom-left">
                          <ul>
                            <li className="text-bold">Invoiced To:</li>
                            <li>{product.sellerDetail}</li>
                          </ul>
                        </div>
                        <div className="invoice-head-bottom-right">
                          <ul className="text-end">
                            <li className="text-bold">Pay To:</li>
                            <li>{product.customerDetail}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-view">
                      <div className="invoice-body">
                        <table>
                          <thead>
                            <tr>
                              <td className="text-bold">SI No</td>
                              <td className="text-bold">Product Name</td>
                              <td className="text-bold">Rate</td>
                              <td className="text-bold">QTY</td>
                              <td className="text-bold">Amount</td>
                            </tr>
                          </thead>
                          <tbody>
                            {product.soldProductDetails &&
                              product.soldProductDetails.map(
                                (soldProduct, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{soldProduct.productName}</td>
                                    <td>${soldProduct.salePrice}</td>
                                    <td>{soldProduct.quantitySold}</td>
                                    <td className="text-end">
                                      ${soldProduct.costPrice}
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                        <div className="invoice-body-bottom">
                          <div className="invoice-body-info-item border-bottom">
                            <div className="info-item-td text-end text-bold">
                              Sub Total:
                            </div>
                            <div className="info-item-td text-end">
                              ${product.subTotal}
                            </div>
                          </div>
                          <div className="invoice-body-info-item border-bottom">
                            <div className="info-item-td text-end text-bold">
                              Discount:
                            </div>
                            <div className="info-item-td text-end">
                              ${product.discount}
                            </div>
                          </div>
                          <div className="invoice-body-info-item">
                            <div className="info-item-td text-end text-bold">
                              Total:
                            </div>
                            <div className="info-item-td text-end">
                              ${product.grandAmount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-foot text-center">
                      <p>
                        <span className="text-bold text-center">
                          NOTE:&nbsp;
                        </span>
                        This is a computer-generated receipt and does not
                        require a physical signature.
                      </p>

                      <div className="invoice-btns">
                        <Button
                          type="submit"
                          sx={{ mt: 1, mb: 2, px: 5 }}
                          variant="contained"
                          onClick={() => handlePrint(product.receiptNumber)}
                        >
                          <span>
                            <i className="fa-solid fa-print"></i>
                          </span>
                          <span> Print</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* pagination */}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20vh"
          >
            <Pagination
              count={totalPages}
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

export default AllReceipt;
