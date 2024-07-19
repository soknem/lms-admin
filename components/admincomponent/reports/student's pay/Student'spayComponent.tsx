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
import { RootState } from "@/lib/store";
import {
  getStudentPaymentStart,
  getStudentPaymentSuccess,
  getStudentPaymentFailure,
  selectStudentPaymentData,
} from "@/lib/features/admin/report/studentPayment/studentPaymentSlice";
import { useGetStudentPaymentQuery } from "@/lib/features/admin/report/studentPayment/studentPayment";

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
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetStudentPaymentQuery();
  const payments = useSelector(selectStudentPaymentData);

  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(getStudentPaymentStart());
    } else if (isError) {
      dispatch(getStudentPaymentFailure(error?.toString() || "Failed to fetch student payments data"));
    } else if (data) {
      dispatch(getStudentPaymentSuccess(data));
    }
  }, [isLoading, isError, data, dispatch, error]);

  useEffect(() => {
    if (chartContainer.current && payments) {
      const labels = ["Student Payments "];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Paid Complete",
            data: [payments.totalStudentPaidCompletePercentage],
            borderColor: "green",
            backgroundColor: "green",
          },
          {
            label: "Paid Partial",
            data: [payments.totalStudentPaidPartialPercentage],
            borderColor: "orange",
            backgroundColor: "orange",
          },
          {
            label: "Not Paid",
            data: [payments.totalStudentNotPaidPercentage],
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
              position: "top",
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
  }, [payments]);

  return (
      <div className="bg-lms-white-80 p-5 h-full flex justify-between rounded-xl border">
        <div className="w-[700px] h-[700px]">
          <div className="mb-4 bg-lms-primary text-lms-white-80 rounded w-[150px] text-center h-[35px] p-1">
            Generation 1
          </div>
          <Table className="w-[500px]">
            <TableHeader className="font-bold text-[15px] bg-lms-transcript-header ">
              <TableRow>
                <TableHead>STUDENT PAYMENT</TableHead>
                <TableHead>TOTAL</TableHead>
                <TableHead>PERCENT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">Paid Complete</TableCell>
                      <TableCell>{payments.totalStudentPaidComplete}</TableCell>
                      <TableCell>{payments.totalStudentPaidCompletePercentage}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Paid Partial</TableCell>
                      <TableCell>{payments.totalStudentPaidPartial}</TableCell>
                      <TableCell>{payments.totalStudentPaidPartialPercentage}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Not Paid</TableCell>
                      <TableCell>{payments.totalStudentNotPaid}</TableCell>
                      <TableCell>{payments.totalStudentNotPaidPercentage}%</TableCell>
                    </TableRow>
                  </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-lms-background">
                <TableCell className="font-bold">Total Payment</TableCell>
                <TableCell></TableCell>

                <TableCell>{payments ? payments.totalStudentPayment : 0}</TableCell>
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
