'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useGetAttendanceQuery } from "@/lib/features/instructor/report/attendance/attendance";
import { selectAttendance, setAttendance } from "@/lib/features/instructor/report/attendance/attendanceSlice";
import { AttendanceData } from "@/components/instructorcomponent/reports/attendence/AttentdentData";
import { attentdentColumns } from "@/components/instructorcomponent/reports/attendence/AttentdentColumns";
import { AttendanceT } from "@/lib/types/instructor/report";

export default function Attendance() {
    const dispatch = useDispatch<AppDispatch>();

    // Fetch attendance data
    const { data, error, isLoading } = useGetAttendanceQuery();

    // Select attendance from Redux store
    const attendance = useSelector((state: RootState) => selectAttendance(state));

    // Effect to update Redux store on data change
    useEffect(() => {
        if (data) {
            dispatch(setAttendance(data.content));
        }
        if (error) {
            console.error("Failed to load attendance", error);
        }
    }, [data, error, dispatch]);

    // Use attendance data from Redux store
    // const attendanceData: AttendanceT[] = attendance;


    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <h1 className="text-3xl font-bold text-lms-primary">Attendance</h1>
            <AttendanceData columns={attentdentColumns} data={attendance} />
        </section>
    );
}
