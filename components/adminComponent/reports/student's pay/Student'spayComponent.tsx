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

const payments = [
  {
    status: "Paid",
    total: "200",
    percent: "80%",
  },
  {
    status: "Unpaid",
    total: "50",
    percent: "20%",
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

const StudentpayComponent: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const labels = ["Semester 1", "Semester 2"];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Paid",
            data: [40, 60], // Percentages for Paid payments
            borderColor: "green",
            backgroundColor: "green",
          },
          {
            label: "Unpaid",
            data: [20, 40], // Percentages for Unpaid payments
            borderColor: "red",
            backgroundColor: "red",
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
              position: "right",
              labels: {
                boxWidth: 20,
              },
            },
            title: {
              display: true,
              text: "Total Student's Payment",
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
    <div className="bg-lms-white-80 p-5 h-full flex justify-between rounded-xl border">
      <div className="w-1/2 p-5">
        <div className="mb-4 bg-lms-primary text-lms-white-80  rounded w-[150px] text-center h-[35px] p-1">
          Generation 1
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>STUDENT PAYMENT</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PERCENT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.status}>
                <TableCell className="font-medium">{payment.status}</TableCell>
                <TableCell>{payment.total}</TableCell>
                <TableCell>{payment.percent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-lms-background">
              <TableCell className="font-medium">TOTAL</TableCell>
              <TableCell>250</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="chart-container w-1/2 p-5">
        <canvas ref={chartContainer}></canvas>
      </div>
    </div>
  );
};

export default StudentpayComponent;
