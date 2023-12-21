import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const BubbleChart = ({ products }) => {
  // Use state to manage the chart data
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Products",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bubble",
        height: 345,
      },
      xaxis: {
        tickAmount: 12,
        type: "category",
      },
      yaxis: {
        max: 30,
      },
      markers: {
        size: 8,
      },
      fill: {
        opacity: 0.8,
      },
      legend: {
        show: false,
      },
    },
  });

  
  useEffect(() => {
    
    const bubbleData = products.map((product) => ({
      x: product.price,
      y: product.status ? 20 : 10, 
      z: product.productName,
    }));

    setChartData({
      ...chartData,
      series: [
        {
          ...chartData.series[0],
          data: bubbleData,
        },
      ],
    });
  }, [products]);

  return (
    <Card>
      <CardContent>
        <div>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bubble"
            height={280}
          />
              <p>Product Price Range</p>
        </div>
      </CardContent>
     </Card>
  );
};

export default BubbleChart;
