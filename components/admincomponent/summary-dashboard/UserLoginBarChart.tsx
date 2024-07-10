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
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const UserLoginBarChart = () => {
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const myChart = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartContainer.current) {
            const labels = ["Semester 1"];
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: "Female",
                        data: [70], // Percentage for Female students
                        borderColor: "red",
                        backgroundColor: "red",
                    },
                    {
                        label: "Male",
                        data: [30], // Percentage for Male students
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
                                boxWidth: 10,
                            },
                        },
                        title: {
                            display: true,
                            text: "Total Admission",
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
        <div className="bg-white p-5 h-full flex justify-between items-center rounded-xl">
            <div className="chart-container w-[600px] h-[400px] md:w-1/2 ">
                <canvas ref={chartContainer}></canvas>
            </div>


        </div>
    );
};

export default UserLoginBarChart;
