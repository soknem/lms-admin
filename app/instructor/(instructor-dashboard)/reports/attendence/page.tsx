'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAttendanceQuery } from "@/lib/features/instructor/report/attendance/attendance";
import { setAttendance } from "@/lib/features/instructor/report/attendance/attendanceSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { AttendanceData } from "@/components/instructorcomponent/reports/attendence/AttentdentData";
import {
    attendantColumns,

} from "@/components/instructorcomponent/reports/attendence/AttentdentColumns";
import {AttentType} from "@/lib/types/instructor/report";

export default function Attendance()
{

    const dispatch = useDispatch<AppDispatch>();
    const { data, error, isLoading } = useGetAttendanceQuery({ page: 0, pageSize: 10 });

    useEffect(() => {
        console.log("Data:", data);
        console.log("Error:", error);
        console.log("IsLoading:", isLoading);

        if (data) {
            console.log("Dispatching setAttendance with data:", data.content);
            dispatch(setAttendance(data.content));
        } else if (error) {
            console.error("Failed to load attendance", error);
        }
    }, [data, error, isLoading, dispatch]);

    const attendanceData = useSelector((state: RootState) => state.attendance) || [];

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <h1 className="text-3xl font-bold text-lms-primary">Attendance</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading data</p>
            ) : (
                <AttendanceData columns={attendantColumns} data={data} />
            )}
        </section>
    );
}
