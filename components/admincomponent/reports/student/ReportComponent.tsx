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
import { useGetStudentQuery } from "@/lib/features/admin/report/student/student";
import { StudentReportData } from "@/lib/types/admin/report";

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
    const generation = "generation-1";
    const studyProgram = "software-engineering";
    const academicYear = "2024-2025";
    const { data, isLoading, error } = useGetStudentQuery({ generation, studyProgram, academicYear });

    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const myChart = useRef<Chart | null>(null);

    useEffect(() => {
        if (data && chartContainer.current) {
            const labels = ["Total Students"];
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
                        label: "Drop",
                        data: [data.totalDroppedStudentPercentage],
                        borderColor: "pink",
                        backgroundColor: "pink",

                    },
                    {
                        label: "Active",
                        data: [data.totalActiveStudentPercentage],
                        borderColor: "green",
                        backgroundColor: "green",

                    },
                    {
                        label: "Hiatus",
                        data: [data.totalHiatusStudentPercentage],
                        borderColor: "orange",
                        backgroundColor: "orange",


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
        <div className="bg-lms-white-80 p-4 h-full flex justify-between rounded-xl">
            <div className="w-[700px] h-[700px] mt-5">
                <canvas ref={chartContainer}></canvas>
            </div>
            <div className="mx-15 mt-6">
                <Table className="w-[400px]">
                    <TableHeader className="font-bold text-[15px]  bg-lms-transcript-header">
                        <TableRow>
                            <TableCell>STUDENT</TableCell>
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
                        <TableRow>
                            <TableCell className="font-medium">Drop</TableCell>
                            <TableCell>{data.totalDroppedStudent}</TableCell>
                            <TableCell>{data.totalDroppedStudentPercentage}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Active</TableCell>
                            <TableCell>{data.totalActiveStudent}</TableCell>
                            <TableCell>{data.totalActiveStudentPercentage}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Hiatus</TableCell>
                            <TableCell>{data.totalHiatusStudent}</TableCell>
                            <TableCell>{data.totalHiatusStudentPercentage}%</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className="bg-lms-background ">
                        <TableRow className="font-bold ">
                            <TableCell>Total Student</TableCell>
                            <TableCell></TableCell>
                            <TableCell className="">{data.totalStudent}</TableCell>

                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default ReportComponent;
