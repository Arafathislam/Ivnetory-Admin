import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

function StackedChart({data}) {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      // ... existing options
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
       

        setChartData({
          series: [
            {
              name: "Sale Price",
              data: data.map(entry => ({ x: entry.x, y: entry.y[0] })),
            },
            {
              name: "Cost Price",
              data: data.map(entry => ({ x: entry.x, y: entry.y[1] })),
            },
          ],
          options: chartData.options, // Keep existing options
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <Card>
      <CardContent>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={345}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default StackedChart;
