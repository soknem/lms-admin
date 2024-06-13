import React from "react";

//import component

//import type
import { LectureType } from "@/lib/types/admin/academics";
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


export default  function Lecture() {
    const data: LectureType[] = lectures;

    // Filter data for current data
    const filteredCurrentLectureData = data.filter(lecture => lecture.status === 1);

    const filteredEndedLectureData = data.filter(lecture => lecture.status === 2 || lecture.status === 3);

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses" className='font-semibold text-gray-30 uppercase'>COURSE</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail" className='font-semibold text-gray-30 uppercase'>INTRODUCTION TO IT</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase">LECTURE</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className=' text-3xl font-bold text-lms-primary'>Lectures</h1>
            <Tabs defaultValue="current" className="w-full">

                <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="current">Current Teaching Session</TabsTrigger>
                    <TabsTrigger value="ended">Ended Teaching Session</TabsTrigger>

                </TabsList>

                <TabsContent value="current">
                    <InstructorCurrentLectureDataTable columns={InstructorCurrentLectureColumns} data={filteredCurrentLectureData} />
                </TabsContent>

                <TabsContent value="ended" >
                    <InstructorEndedLectureDatatable columns={InstructorEndedLectureColumns} data={filteredEndedLectureData} />
                </TabsContent>

            </Tabs>

        </section>
    );
}