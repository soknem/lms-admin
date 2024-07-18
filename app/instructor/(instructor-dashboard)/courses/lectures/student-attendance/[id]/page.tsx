'use client'
import React, {useEffect} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
    StudentAttendanceDataTable
} from "@/components/instructorcomponent/lectures/student-attendance/StudentAttendanceDataTable";
import {
    StudentAttendanceColumns
} from "@/components/instructorcomponent/lectures/student-attendance/StudentAttendanceColumns";
import {useDispatch, useSelector} from "react-redux";
import {useGetStudentAttendanceQuery} from "@/lib/features/instructor/studentAttendance/studentAttendance";
import {CurrentType, StudentAttendanceType} from "@/lib/types/instructor/lecture";
import {RootState} from "@/lib/store";
import {
    selectStudentAttendances,
    setStudentAttendances
} from "@/lib/features/instructor/studentAttendance/studentAttendanceSlice";


const StudentAttendance = () => {
    const dispatch = useDispatch();
    const { data, error } = useGetStudentAttendanceQuery();
    const studentAttendance: StudentAttendanceType[] = useSelector((state: RootState) => selectStudentAttendances(state));

    useEffect(() => {
        if (data) {
            dispatch(setStudentAttendances(data.content));
        }
        if (error) {
            console.error('Failed to load student attendance', error);
        }
    }, [data, error, dispatch]);

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses" className="font-semibold text-gray-30 uppercase hover:underline">COURSE</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail" className="font-semibold text-gray-30 uppercase hover:underline">INTRODUCTION TO IT</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail/lectures" className="font-semibold text-gray-30 uppercase hover:underline">10:00AM - 12:00PM</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase">Student Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold text-lms-primary">Student Attendance</h1>
            <StudentAttendanceDataTable columns={StudentAttendanceColumns} data={studentAttendance} />
        </section>
    );
};

export default StudentAttendance;
