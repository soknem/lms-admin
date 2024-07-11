'use client'
import React, {useEffect} from "react";
import {useGetClassesQuery, useGetSummaryQuery} from "@/lib/features/admin/academic-management/classes/classApi";
import {any} from "prop-types";
import DashboardCard from "@/components/admincomponent/summary-dashboard/DashboardCard";
import {PiStudent} from "react-icons/pi";
import DashboardSingleCard from "@/components/admincomponent/summary-dashboard/dashboardSingleCard";
import UserLoginBarChart from "@/components/admincomponent/summary-dashboard/UserLoginBarChart";
import {LectureColumns} from "@/components/admincomponent/academics/lectures/LectureColumns";
import {LectureDataTable} from "@/components/admincomponent/academics/lectures/LectureDataTable";
import {SummaryLectureDataTable} from "@/components/admincomponent/summary-dashboard/SummaryLectureDataTable";
import { SummaryLectureColumns } from "@/components/admincomponent/summary-dashboard/SummaryLectureColumns";


export default  function Dashboard() {

    const {data, error} = useGetSummaryQuery(any)

    console.log("summary : ",data)

    const student = data?.totalStudent || 0;

    const DropStudent = data?.totalDropStudent || 0;

    const ActiveStudent = data?.totalActiveStudent || 0;

    const ActiveClass = data?.totalClassActive || 0;

    const ActiveCourse = data?.totalCourseActive || 0;

    const NewUser = data?.newUser || 0;

    const Payment = data?.totalStudentPayment || 0

    const ActiveLecture = data?.currentLecture || [];



    // @ts-ignore
    return (
        <section className="flex flex-col gap-4 h-full w-full p-9 space-y-6">
            <h1 className=' text-3xl font-bold text-lms-primary'>Summary Dashboard</h1>
            <div className="grid grid-cols-5 gap-4">
                <DashboardCard label="Students" total={student} Icon={PiStudent} value2={DropStudent}
                               value1={ActiveStudent} subLabel1="Active" subLabel2="Drop"/>

                <DashboardCard label="Courses" total={ActiveCourse} Icon={PiStudent} value2={DropStudent}
                               value1={ActiveCourse} subLabel1="Started" subLabel2="Ended"/>

                <DashboardCard label="Classes" total={ActiveClass} Icon={PiStudent} value2={DropStudent}
                               value1={ActiveCourse} subLabel1="Started" subLabel2="Ended"/>

                <DashboardCard label="Users" total={NewUser} Icon={PiStudent} value2={DropStudent} value1={ActiveCourse}
                               subLabel1="Female" subLabel2="Male"/>

                <DashboardCard label="Student Payment" total={Payment} Icon={PiStudent} value2={DropStudent}
                               value1={ActiveCourse} subLabel1="Female" subLabel2="Male"/>


            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <UserLoginBarChart/>
                </div>

                <div>
                    <UserLoginBarChart/>
                </div>
            </div>


            <div className="space-y-4">
                <SummaryLectureDataTable columns={SummaryLectureColumns} data={ActiveLecture}/>
            </div>


        </section>
    );
}