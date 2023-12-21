import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField, Button } from "@mui/material";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const UserDetails = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchUsers = async (pageNumber, itemsPerPage) => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/details?page=${pageNumber}&limit=${itemsPerPage}`
      );

      const { results, total_page } = response.data.data;
      console.log(results, "r");
      setAllUsers(results);
      setTotalPages(total_page);
    } catch (error) {
      console.error("Error fetching Receipt:", error);
    }
  };

  // console.log("data", allUsers);

 // delete
const handleDelete = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/admin/delete/${id}`);
    console.log(response);
    if (response.data.httpStatus === 200) {
      console.log("User delete successfully");
      fetchUsers(currentPage, itemsPerPage);
    } else {
      console.error("Error deleting User");
    }
  } catch (error) {
    console.error("Error deleting User:", error);
  }
};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          paddingLeft: "10px",
        }}
      >
        <h1>User Details</h1>
      </Box>

      {/* Table start */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "20px" }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{
              "@media (min-width: 600px)": {
                minWidth: "600px",
              },
              "@media (min-width: 800px)": {
                minWidth: "800px",
              },
              "@media (min-width: 1200px)": {
                minWidth: "1200px",
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>SLNo</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">Create Time</TableCell>
                <TableCell align="right">Update Time</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers &&
                allUsers.map((user, index) => {
                  let createTime = new Date(user.createdAt);
                  let formattedCreateTime = `${createTime.toLocaleDateString()} ${createTime.toLocaleTimeString()}`;
                  let updateTime = new Date(user.updatedAt);
                  let formattedUpdateTime = `${updateTime.toLocaleDateString()} ${updateTime.toLocaleTimeString()}`;
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell align="right">
                        {user.status ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">{formattedCreateTime}</TableCell>

                      <TableCell align="right">{formattedUpdateTime}</TableCell>
                      <TableCell align="right">
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(user._id)} 
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
    </>
  );
};

export default UserDetails;
