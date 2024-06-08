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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const genders = [
  {
    gender: "Female",
    percent: "70%",
    totalAmount: "250",
  },
  {
    gender: "Male",
    percent: "30%",
    totalAmount: "150",
  },
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

const ReportInstructorComponent: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const labels = ["Semester 1", "Semester 2"];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Female",
            data: [70, 55], // Percentages for Female students
            borderColor: "red",
            backgroundColor: "red",
          },
          {
            label: "Male",
            data: [30, 45], // Percentages for Male students
            borderColor: "blue",
            backgroundColor: "blue",
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
              ticks: {
                callback: function (value: number) {
                  return value + "%";
                },
              },
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
              display: "top",
              text: "Total Staff",
            },
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + "%";
                  }
                  return label;
                },
              },
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
    <div className="bg-lms-white80 p-5 h-full flex justify-between rounded-xl">
      <div className="chart-container w-full h-96 md:w-1/2 mx-10">
        <canvas ref={chartContainer}></canvas>
      </div>
      <div className="mt-9 mx-10">
        <Table className="w-[500px]">
        <TableHeader>
          <TableRow>
            <TableHead>INSTRUCTOR</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PERCENT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {genders.map((gender) => (
            <TableRow key={gender.gender}>
              <TableCell className="font-medium">{gender.gender}</TableCell>
              <TableCell>{gender.totalAmount}</TableCell>
              <TableCell>{gender.percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-lms-background">
            <TableCell>TOTAL</TableCell>
            <TableCell>200</TableCell>
            <TableCell>100%</TableCell>

          </TableRow>
        </TableFooter>
      </Table>
      </div>
      
    </div>
  );
};

export default ReportInstructorComponent;
