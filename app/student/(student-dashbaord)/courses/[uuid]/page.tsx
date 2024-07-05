// CourseDetail.tsx
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BreadcrumbWithCustomSeparator } from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import CourseDetailHeader from "@/components/studentcomponent/coursedetail/CourseDetailHeader";
import TabComponent from "@/components/studentcomponent/coursedetail/TabComponent";
import { useGetCourseDetailQuery } from "@/lib/features/student/course/studentCourse";
import { AppDispatch } from "@/lib/store";


type CourseDetailProps = {
    params: {
        uuid: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

export default function CourseDetail(props: CourseDetailProps) {
    const { uuid } = props.params;
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading } = useGetCourseDetailQuery({ uuid });

    useEffect(() => {}, [dispatch, uuid]);

    if (isLoading) {
        return <div>Loading...</div>; // Or your preferred loading state
    }

    return (
        <main>
            <div className="bg-white py-[35px]">
                <CourseDetailHeader allData={data} />
            </div>
            <div className="p-5 mx-[100px]">
                <BreadcrumbWithCustomSeparator />
            </div>
            <div className="mx-[100px]">
                <TabComponent />
            </div>
        </main>
    );
}