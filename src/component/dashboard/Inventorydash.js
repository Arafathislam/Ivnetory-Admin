import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DonutChart from './DonutChart';
import StackedChart from './StackedChart';
import BubbleChart from './BubbleChart';

import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const Inventorydash = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await axios.get(`${baseURL}/dashboard/`);
        setData(response.data.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependencies array to run only once when the component mounts

  // Log relevant data and states
  // console.log('Data:', data);
  // console.log('Loading:', loading);
  // console.log('Error:', error);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Box sx={{ width: "100%", px: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ my: 2 }}>
          {/* Product Section */}
          <Box
            sx={{
              p: 1,
              width: "100%",
              backgroundColor: "#01C6B3",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              All Products
            </Typography>
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              {data.totalProduct} Type
            </Typography>
          </Box>
          {/* Stocks Section */}
          <Box
            sx={{
              p: 1,
              width: "100%",
              backgroundColor: "#7A57C0",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              Stocks
            </Typography>
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              {data.totalStock[0]? data.totalStock[0].totalQuantity : 0} pcs
            </Typography>
          </Box>
          {/* Sales Section */}
          <Box
            sx={{
              p: 1,
              width: "100%",
              backgroundColor: "#0088FE",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              Today Total Sales
            </Typography>
            <Typography variant="h4" color="text.primary" sx={{ mt: 0.5, ml: 1, fontWeight: 'bold' }}>
              {data.todaySaleCount} pcs
            </Typography>
          </Box>
        </Stack>

        <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
          Diagnostics
        </Typography>
        <Box sx={{ width: "100%" }}>
            <StackedChart data={data.processedData} />
          </Box>
        {/* <Stack direction="row" spacing={2} sx={{ my: 2 }}> */}
          {/* Line Chart */}
          {/* <Box sx={{ width: "100%" }}>
            <LineChart stock={data.topStocks} />
          </Box> */}
          {/* Basic Pie Chart */}
          {/* <Box sx={{ width: "100%" }}>
            <BasicPieChart />
          </Box> */}
          {/* Donut Chart */}
        
        {/* </Stack> */}

 
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Box sx={{ width: "100%" }}>
            <DonutChart topStocks={data.result}/>
          </Box>
          {/* Diagnostics Column Chart */}
          {/* <Box sx={{ width: "100%" }}>
            <DiagonsticsColumnChart />
          </Box> */}
          {/* Bubble Chart */}
          <Box sx={{ width: "100%" }}>
            <BubbleChart products={data.products} />
          </Box>
          {/* Stacked Chart */}
        </Stack>
      </Box>
    </>
  );
}

export default Inventorydash;
