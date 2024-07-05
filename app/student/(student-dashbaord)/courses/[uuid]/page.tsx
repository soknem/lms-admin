"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BreadcrumbWithCustomSeparator } from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import TabComponent from "@/components/studentcomponent/coursedetail/TabComponent";
import { useGetCourseDetailQuery } from "@/lib/features/student/course/studentCourse";
import { AppDispatch } from "@/lib/store";
import type { CourseDetail } from "@/lib/types/student/course";
import CourseDetailHeaderStudent from "@/components/studentcomponent/coursedetail/CourseDetailHeaderStudent";

type CourseDetailProps = {
    params: {
        uuid: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

export default function CourseDetail({ params }: CourseDetailProps) {
    const { uuid } = params;
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useGetCourseDetailQuery({ uuid });

    useEffect(() => {}, [dispatch, uuid]);

    return (
        <main>
            <div className="bg-white py-[35px]">
                <CourseDetailHeaderStudent allData={data as CourseDetail} />
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

// Compare this snippet from components/studentcomponent/coursedetail/CurriculumComponent.tsx:
// "use client";