import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const DonutChart = ({ topStocks }) => {
  const stockQuantities = topStocks.map(stock => stock.stockQuantity);
  const productName = topStocks.map(stock => stock.productName);

  const [chartData, setChartData] = useState({
    series: stockQuantities,
    options: {
      chart: {
        type: "donut",
      },
      labels: productName,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],

      tooltip: {
        y: {
          formatter: function (value) {
            return value + " your text";
          },
        },
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const data = w.config.series[seriesIndex];
          const customName = productName[seriesIndex];
          const customDescription = `Stock Quantity: ${data}`;

          return (
            '<div class="tooltip" style="padding:5px">' +
            '<span class="series-name">' +
            customName +
            ": " +
            "</span>" +
            '<span class="data-point">' +
            data +
            "</span>" +
            '<p class="series-description">' +
            customDescription +
            "</p>" +
            "</div>"
          );
        },
      },
    },
  });

  return (
    <Card>
      <CardContent>
        <div>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width={480}
            height={300}
            />
            <p>Top Oldest Stocks</p>
        </div>

     </CardContent>
    </Card>
  );
};

export default DonutChart;
