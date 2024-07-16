import React, { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@/components/ui/table";
import { useGetStudentQuery } from "@/lib/features/admin/report/student/student"; // Update with correct path

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const ReportComponent: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  // Fetch student data using Redux Toolkit's useGetStudentQuery
  const { data: students, isLoading, isError } = useGetStudentQuery();

  useEffect(() => {
    if (chartContainer.current && students) {
      const labels = ["Total"]; // Update labels as needed
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Female",
            data: [students.totalFemale], // Example: Access fields based on your API response structure
            borderColor: "red",
            backgroundColor: "red",
          },
          {
            label: "Male",
            data: [students.totalMale], // Example: Access fields based on your API response structure
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
              display: true,
              text: "Total Student",
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
  }, [students]); // Ensure useEffect runs when students data changes

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
      <div className="bg-lms-white-80 p-5 h-full flex flex-col items-center rounded-xl">
        <div className="flex flex-col md:flex-row w-full">
          <div className="chart-container w-full md:w-1/2 mx-10">
            <canvas ref={chartContainer}></canvas>
          </div>
          <div className="mt-9 mx-10">
            <Table className="w-[500px]">
              <TableHead>
                <TableRow>
                  <TableHead>STUDENT</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>PERCENT</TableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Female</TableCell>
                  <TableCell>{students.totalFemale}</TableCell>
                  <TableCell>{students.totalFemalePercentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Male</TableCell>
                  <TableCell>{students.totalMale}</TableCell>
                  <TableCell>{students.totalMalePercentage}%</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow className="bg-lms-background">
                  <TableCell>TOTAL</TableCell>
                  <TableCell>{students.totalStudent}</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
  );
};

export default ReportComponent;
