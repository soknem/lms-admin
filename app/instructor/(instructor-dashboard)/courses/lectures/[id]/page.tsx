'use client'
import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    InstructorCurrentLectureDataTable
} from "@/components/instructorcomponent/lectures/current-lecture/InstructorCurrentLectureDataTable";
import {
    InstructorCurrentLectureColumns
} from "@/components/instructorcomponent/lectures/current-lecture/InstructorCurrentLectureColumns";
import {
    InstructorEndedLectureDatatable
} from "@/components/instructorcomponent/lectures/end-lecture/InstructorEndedLectureDatatable";
import {
    InstructorEndedLectureColumns
} from "@/components/instructorcomponent/lectures/end-lecture/InstructorEndedLectureColumns";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentLectureQuery } from "@/lib/features/instructor/lecture/currentLecture";
import { useGetEndedLectureQuery } from "@/lib/features/instructor/endLecture/endedLecture";
import { selectCurrents, setCurrents } from "@/lib/features/instructor/lecture/currentLectureSlice";
import { selectEndeds, setEndeds } from "@/lib/features/instructor/endLecture/endedLectureSlice";
import { RootState } from "@/lib/store";

export default function Lecture() {
    const dispatch = useDispatch();
    const { data: CurrentData, error: Currenterror } = useGetCurrentLectureQuery();
    const { data: EndedData, error: Endederror } = useGetEndedLectureQuery();

    const filteredCurrentLectureData = useSelector((state: RootState) => selectCurrents(state));
    const filteredEndedLectureData = useSelector((state: RootState) => selectEndeds(state));

    // Effect to update Redux store on data change
    useEffect(() => {
        if (CurrentData) {
            dispatch(setCurrents(CurrentData.content));
        }
        if (Currenterror) {
            console.error("Failed to load current", Currenterror);
        }
    }, [CurrentData, Currenterror, dispatch]);

    useEffect(() => {
        if (EndedData) {
            dispatch(setEndeds(EndedData.content));
        }
        if (Endederror) {
            console.error("Failed to load ended", Endederror);
        }
    }, [EndedData, Endederror, dispatch]);

    const [activeTab, setActiveTab] = useState("current"); // State for managing active tab

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses" className="font-semibold text-gray-30 uppercase">
                                COURSE
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/courses/coursedetail" className="font-semibold text-gray-30 uppercase">
                                INTRODUCTION TO IT
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase">
                            LECTURE
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold text-lms-primary">Lectures</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="current">Current Teaching Session</TabsTrigger>
                    <TabsTrigger value="ended">Ended Teaching Session</TabsTrigger>
                </TabsList>

                <TabsContent value="current">
                    <InstructorCurrentLectureDataTable
                        columns={InstructorCurrentLectureColumns}
                        data={filteredCurrentLectureData}
                    />
                </TabsContent>

                <TabsContent value="ended">
                    <InstructorEndedLectureDatatable
                        columns={InstructorEndedLectureColumns}
                        data={filteredEndedLectureData}
                    />
                </TabsContent>
            </Tabs>
        </section>
    );
}
