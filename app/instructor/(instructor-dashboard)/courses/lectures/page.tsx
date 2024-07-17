'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import lectures from "./data/lectures.json";
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
import {Filter} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {useGetAssessmentQuery} from "@/lib/features/instructor/assessment/assessment";
import {AssessmentType} from "@/lib/types/instructor/assessment";
import {RootState} from "@/lib/store";
import {selectAssessment, setAssessment} from "@/lib/features/instructor/assessment/assessmentSlice";
import React, {useEffect} from "react";
import {useGetCurrentLectureQuery} from "@/lib/features/instructor/lecture/currentLecture";
import {CurrentType, EndedLectureType} from "@/lib/types/instructor/lecture";
import {selectCurrents, setCurrents} from "@/lib/features/instructor/lecture/currentLectureSlice";
import {useGetEndedLectureQuery} from "@/lib/features/instructor/endLecture/endedLecture";
import {selectEndeds, setEndeds} from "@/lib/features/instructor/endLecture/endedLectureSlice";
import {useGetLectureQuery} from "@/lib/features/instructor/lectureadd/lecture";
import {selectLecture, setLecture} from "@/lib/features/instructor/lectureadd/lectureSlice";
import {LectureRespondType} from "@/lib/types/admin/academics";
import {LectureDataTable} from "@/components/admincomponent/academics/lectures/LectureDataTable";
import {LectureColumns} from "@/components/admincomponent/academics/lectures/LectureColumns";

export default function Lecture() {
    const dispatch = useDispatch();
    const {data: CurrentData, error: Currenterror} = useGetCurrentLectureQuery();
    const {data: EndedData, error: Endederror} = useGetEndedLectureQuery();
    const {data: LectureData,error:LectureError} = useGetLectureQuery({ page: 0, pageSize: 10 });


    // Select assessment from Redux store
    const filteredCurrentLectureData: CurrentType[] = useSelector((state: RootState) => selectCurrents(state));
    const filteredEndedLectureData: EndedLectureType[] = useSelector((state: RootState) => selectEndeds(state));

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

    const transformToLectureData = (data : any[]) : LectureRespondType[] => {
        return data.map(item  => ({
            uuid: item.uuid ,
            startTime: item.startTime,
            endTime: item.endTime,
            lectureDate: item.lectureDate,
            isDeleted: item.isDeleted,
            isDraft: item.isDraft,
            status: item.status,
            teachingType: item.teachingType,
            classCode: item.classCode,
            courseTitle: item.course ? item.course.title : 'N/A',
            courseUuid: item.course ? item.course.uuid : 'N/A',
            instructorName: item.course && item.course.instructor ? item.course.instructor.nameEn : 'N/A',
            instructorUuid: item.course && item.course.instructor ? item.course.instructor.uuid : 'N/A',
            session: `${item.startTime}-${item.endTime}`,
        }));
    };

    useEffect(() => {
        if(LectureData) {
            dispatch(setLecture(transformToLectureData(LectureData.content)))
        }
        if(LectureError){
            console.error("failed to load lecture", LectureError);
        }
    }, [LectureData, LectureError, dispatch]);

    // // Filter data for current and ended lectures
    // const filteredCurrentLectureData = data.filter(
    //     (lecture) => lecture.status === 1
    // );
    //
    // const filteredEndedLectureData = data.filter(
    //     (lecture) => lecture.status === 2 || lecture.status === 3
    // );
    console.log("lecture data from lecture page: ", LectureData);
    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href="/instructor/courses"
                                className="font-semibold text-gray-30 uppercase"
                            >
                                COURSE
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href="/instructor/courses/coursedetail"
                                className="font-semibold text-gray-30 uppercase"
                            >
                                INTRODUCTION TO IT
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-lms-primary uppercase">
                            LECTURE
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className=" text-3xl font-bold text-lms-primary">Lectures</h1>

            <Tabs defaultValue="current" className="w-full">
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
