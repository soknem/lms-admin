"use client";
import React from "react";
import {BreadcrumbWithCustomSeparator} from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import TabComponent from "@/components/studentcomponent/coursedetail/TabComponent";
import type {PropsParam} from "@/lib/types/student/course";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";
import {useGetInstructorCourseByUuidQuery} from "@/lib/features/instructor/course/instructorCourse";
import CourseDetailHeaderInstructor from "@/components/instructorcomponent/coursedetail/CourseDetailHeader";
import {CourseResponse} from "@/lib/types/instructor/courseDetail";

export default function CourseDetail({params}: PropsParam) {
    const uuid = params.uuid;
    const {data, error, isLoading} = useGetInstructorCourseByUuidQuery({uuid});

    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (error) {
        return <div>Error loading course details.</div>;
    }

    if (!data) {
        return <div>No course data available.</div>;
    }

    const courseDetails: CourseResponse = data;

    return (
        <main>
            <section className="bg-white py-[35px]">
                <CourseDetailHeaderInstructor
                    year={data.year}
                    semester={data.semester}
                    courseTitle={data.courseTitle}
                    courseDescription={data.courseDescription}
                    courseLogo={data.courseLogo}
                    credit={data.credit}
                    theory={data.theory}
                    practice={data.practice}
                    internship={data.internship}
                    instructor={data.instructor}
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
                <TabComponent
                    courseTitle={courseDetails.courseTitle}
                    courseDescription={courseDetails.courseDescription || "Unknown Description"}
                    curriculumData={courseDetails.curriculum || null}
                />
            </section>
        </main>
    );
}
