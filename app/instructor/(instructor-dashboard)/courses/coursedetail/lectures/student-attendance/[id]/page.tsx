import React from "react";

//import component

//import type
import {studentAttendanceType} from "@/lib/types/admin/studentAttendance";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json"
// @ts-ignore
import { LectureDataTable } from "@/components/admincomponent/academics/lectures/LectureDataTable";
// @ts-ignore
import { LectureColumns } from "@/components/admincomponent/academics/lectures/LectureColumns";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {InstructorEndedLectureDatatable} from "@/components/instructorComponent/lectures/end-lecture/InstructorEndedLectureDatatable";

import {
    InstructorCurrentLectureDataTable
} from "@/components/instructorComponent/lectures/current-lecture/InstructorCurrentLectureDataTable";
import {
    InstructorCurrentLectureColumns
} from "@/components/instructorComponent/lectures/current-lecture/InstructorCurrentLectureColumns";
import {
    InstructorEndedLectureColumns
} from "@/components/instructorComponent/lectures/end-lecture/InstructorEndedLectureColumns";
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
} from "@/components/instructorComponent/lectures/student-attendance/StudentAttendanceDataTable";
import {
    StudentAttendanceColumns
} from "@/components/instructorComponent/lectures/student-attendance/StudentAttendanceColumns";
import Attendences from "@/app/instructor/(instructor-dashboard)/courses/coursedetail/lectures/data/Attendances.json"

export default function StudentAttendance() {
    const data : studentAttendanceType[] = Attendences
    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses" className='font-semibold text-gray-30 uppercase hover:underline'>COURSE</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail" className='font-semibold text-gray-30 uppercase hover:underline'>INTRODUCTION TO IT</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail/lectures" className='font-semibold text-gray-30 uppercase hover:underline'>10:00AM - 12:00PM</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase ">Student Attendance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className=' text-3xl font-bold text-lms-primary'>Student Attendance</h1>
            <StudentAttendanceDataTable columns={StudentAttendanceColumns} data={data} />
        </section>
    );
}