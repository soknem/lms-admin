"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInstructorQuery } from "@/lib/features/admin/report/instructor/instructor";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ReportInstructorComponent: React.FC = () => {
  const { data, isLoading, error } = useGetInstructorQuery();

  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (data && chartContainer.current) {
      const labels = ["Total Instructors"];
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
          {
            label: "Active",
            data: [data.totalActiveInstructorPercentage],
            borderColor: "green",
            backgroundColor: "green",
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
              text: "Total Instructor",
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
        <div className="w-[700px] h-[700px]">
          <canvas ref={chartContainer}></canvas>
        </div>
        <div className="mt-9 mx-10">
          <Table className="w-[500px]">
            <TableHeader>
              <TableRow>
                <TableCell>INSTRUCTOR</TableCell>
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
                <TableCell>{data.totalInstructor}</TableCell>
                <TableCell>100%</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
  );
};

export default ReportInstructorComponent;

