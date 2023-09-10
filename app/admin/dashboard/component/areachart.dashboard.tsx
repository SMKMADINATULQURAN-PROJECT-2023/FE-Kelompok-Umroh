"use client";
import ReactApexChart from "react-apexcharts";
import React from "react";

const AreaChart = () => {
  const options = {
    chart: {
      foreColor: "#ffffff",
      height: 80,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const series = [
    {
      name: "Pengunjung Mobile",
      data: [31, 40, 28, 51, 42, 109, 102, 25, 10, 30, 55, 75],
    },
    {
      name: "Pengunjung Website",
      data: [11, 32, 45, 32, 34, 52, 41, 20, 39, 33, 45, 100],
    },
  ];
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default AreaChart;
