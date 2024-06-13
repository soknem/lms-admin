"use client";
import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table"; // Adjust import path according to your project structure

const earningsData = [
  { year: 2020, earning: 1000 },
  { year: 2021, earning: 5200 },
  { year: 2022, earning: 6000 },
  { year: 2023, earning: 3500 },
  { year: 2024, earning: 4900 },
];

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const EarningsReportComponent: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const labels = earningsData.map((data) => data.year.toString());
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Earning",
            data: earningsData.map((data) => data.earning),
            backgroundColor: "rgba(0, 0, 128, 0.7)",
            borderColor: "rgba(0, 0, 128, 1)", 
          },
        ],
      };

      const config: any = {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 20,
              },
            },
            title: {
              display: true,
              text: "Earning",
            },
          },
        },
      };

      // Destroy the previous chart instance if it exists
      if (myChart.current) {
        myChart.current.destroy();
      }

      myChart.current = new Chart(chartContainer.current, config);
    }

    // Cleanup function to destroy the chart when the component unmounts or before re-rendering
    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-lms-white-80 p-5 h-full flex justify-between rounded-xl">
      <div className="chart-container w-full h-96 md:w-1/2 mx-10">
        <canvas ref={chartContainer}></canvas>
      </div>
      <div className="mr-[100px]">
        <Table className="w-[300px]">
          <TableHead>
            <TableRow className="">
              <TableCell>YEAR</TableCell>
              <TableCell>EARNING</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earningsData.map((data) => (
              <TableRow key={data.year}>
                <TableCell className="font-medium">{data.year}</TableCell>
                <TableCell>{data.earning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EarningsReportComponent;
