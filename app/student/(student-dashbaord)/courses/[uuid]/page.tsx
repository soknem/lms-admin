"use client";
import React from "react";
import {BreadcrumbWithCustomSeparator} from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import TabComponent from "@/components/studentcomponent/coursedetail/TabComponent";
import {useGetCourseDetailQuery} from "@/lib/features/student/course/studentCourse";
import type {PropsParam} from "@/lib/types/student/course";
import CourseDetailHeaderStudent from "@/components/studentcomponent/coursedetail/CourseDetailHeaderStudent";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";

export default function CourseDetail({params}: PropsParam) {
    const uuid = params.uuid;
    const {data, error, isLoading} = useGetCourseDetailQuery({uuid});

    // Debugging console logs

    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (error) {
        return <div>Error loading course details.</div>;
    }

    if (!data) {
        return <div>No course data available.</div>;
    }

    return (
        <main>
            <section className="bg-white py-[35px]">
                <CourseDetailHeaderStudent
                    year={data.year}
                    semester={data.semester}
                    courseTitle={data.courseTitle}
                    courseDescription={data.courseDescription}
                    courseLogo={data.courseLogo}
                    credit={data.credit}
                    theory={data.theory}
                    practice={data.practice}
                    instructor={data.instructor}
                    instructorProfileImage={data.instructorProfileImage}
                    instructorName={data.instructorName}
                    position={data.position}
                    studentProfileImage={data.studentProfileImage}
                    classesStart={data.classesStart}
                />
            </section>
            <section className="p-5 mx-[100px]">
                <BreadcrumbWithCustomSeparator
                    {...data}
                />
            </section>
            <section className="mx-[100px]">
                <TabComponent/>
            </section>
        </main>
    );
}
