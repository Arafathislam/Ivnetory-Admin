import React,{useState,useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const AdminMonitor = () => {
  const[allUsers, setAllUsers] = useState([]);
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
        `${baseURL}/admin/monitor?page=${pageNumber}&limit=${itemsPerPage}`
      );

      const { results, total_page } = response.data.data;

      setAllUsers(results);
      setTotalPages(total_page);
    } catch (error) {
      console.error("Error fetching Receipt:", error);
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

          paddingLeft: "10px", // Adjust as needed
        }}
      >
        <h1>Access Details</h1>
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
              // Add more media queries as needed
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>SLNo</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Version</TableCell>
                <TableCell align="right">OS</TableCell>
                <TableCell align="right">Browser</TableCell>
                <TableCell align="right">Platform</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Desktop</TableCell>
                <TableCell align="right">Bot</TableCell>
                <TableCell align="right">LoginTime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {allUsers &&
    allUsers.map((user, index) => {
      let loginTime = new Date(user.loginTime);
      let formattedLoginTime = `${loginTime.toLocaleDateString()} ${loginTime.toLocaleTimeString()}`;

      return (
        <TableRow
          key={index} // Make sure to include a unique key for each row
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="right">{user.username}</TableCell>
          <TableCell align="right">{user.version}</TableCell>
          <TableCell align="right">{user.os}</TableCell>
          <TableCell align="right">{user.browser}</TableCell>
          <TableCell align="right">{user.platform}</TableCell>
          <TableCell align="right">{user.isMobile ? 'Yes' : 'No'}</TableCell>
          <TableCell align="right">{user.isDesktop ? 'Yes' : 'No'}</TableCell>
          <TableCell align="right">{user.isBot}</TableCell>
          <TableCell align="right">{formattedLoginTime}</TableCell>
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

export default AdminMonitor;
