import React from "react";
import {studentAttendanceType} from "@/lib/types/admin/studentAttendance";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Attendences from "@/app/instructor/(instructor-dashboard)/courses/coursedetail/lectures/data/Attendances.json"
import {
    StudentAttendanceDataTable
} from "@/components/instructorcomponent/lectures/student-attendance/StudentAttendanceDataTable";
import {
    StudentAttendanceColumns
} from "@/components/instructorcomponent/lectures/student-attendance/StudentAttendanceColumns";


export default function StudentAttendance() {
    const data: studentAttendanceType[] = Attendences
    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses"
                                  className='font-semibold text-gray-30 uppercase hover:underline'>COURSE</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail"
                                  className='font-semibold text-gray-30 uppercase hover:underline'>INTRODUCTION TO
                                IT</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail/lectures"
                                  className='font-semibold text-gray-30 uppercase hover:underline'>10:00AM -
                                12:00PM</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase ">Student
                            Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className=' text-3xl font-bold text-lms-primary'>Student Attendance</h1>
            <StudentAttendanceDataTable columns={StudentAttendanceColumns} data={data}/>
        </section>
    );
}