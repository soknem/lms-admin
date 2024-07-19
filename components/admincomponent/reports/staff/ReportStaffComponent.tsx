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
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useGetStaffQuery} from "@/lib/features/admin/report/staff/staff";


Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);;

const ReportStaffComponent: React.FC = () => {
  const { data, isLoading, error } = useGetStaffQuery();

  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);
  useEffect(() => {
    if (data && chartContainer.current) {
      const labels = ["Total Staff"];
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Female",
            data: [data.totalFemalePercentage],
            borderColor: "red",
            backgroundColor: "red",
          },
          {
            label: "Male",
            data: [data.totalMalePercentage],
            borderColor: "blue",
            backgroundColor: "blue",
          },
        ],
      };

      const config: any = {
        type: "bar",
        data: chartData,
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
              display: true,
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

      if (myChart.current) {
        myChart.current.destroy();
      }

      myChart.current = new Chart(chartContainer.current, config);
    }

    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;


  return (
      <div className="bg-lms-white-80 p-5 h-full flex justify-between rounded-xl">
        <div className="w-[500px] h-[500px] ">
          <canvas ref={chartContainer}></canvas>
        </div>
        <div className="mt-9 mx-10">
          <Table className="w-[500px]">
            <TableHeader className="font-bold text-[15px]  bg-lms-transcript-header">
              <TableRow>
                <TableCell>STAFF</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PERCENT</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Female</TableCell>
                <TableCell>{data.totalFemale}</TableCell>
                <TableCell>{data.totalFemalePercentage}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Male</TableCell>
                <TableCell>{data.totalMale}</TableCell>
                <TableCell>{data.totalMalePercentage}%</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow className="bg-lms-background">
                <TableCell>TOTAL</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.totalStaff}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
  );
};

export default ReportStaffComponent;
