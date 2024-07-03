'use client'
import { BreadcrumbWithCustomSeparator } from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import React, {useEffect, useState} from "react";
import { useGetInstructorCourseDetailQuery } from "@/lib/features/instructor/coursedetail/Instructor";
import TabComponent from "@/components/studentcomponent/coursedetail/TabComponent";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {CourseDetail} from "@/lib/types/student/coursedetail/coursedetail";
import {setError, setLoading} from "@/lib/features/student/course/studentCourseSlice";
import Image from "next/image";

export default function CourseDetailPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data = {}, error, isLoading } = useGetInstructorCourseDetailQuery();
    const [courseData, setCourseData] = useState<CourseDetail | null>(null);

    useEffect(() => {
        if (data) {
            dispatch(setLoading());
            setCourseData(data);
        }
        if (error) {
            dispatch(setError(error.toString()));
        }
    }, [data, error, dispatch]);

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="bg-white py-[35px]">
                {/* Course Overview Section */}
                <section className="mx-[90px] flex flex-col-2">
                    <div className="h-[250px]">
                            <span
                                className="px-[25px] py-1 text-sm font-semibold text-white bg-lms-secondary rounded-[10px] mb-10">Year {courseData.year}

                        </span>
                        {/* Semester Badge */}
                        <span
                            className="px-[25px] py-1 text-sm font-semibold text-white bg-lms-secondary rounded-[10px] mb-10 ml-2">Semester {courseData.semester}

                        </span>

                        {/* Course Title */}
                        <h2 className="text-[40px] font-bold text-lms-black90 mt-[14px]">
                            {courseData.courseTitle}
                        </h2>
                        {/* Course Description */}
                        <p className="text-lms-gray-80 w-[803px] text-[18px] mt-[14px]">
                            {courseData.courseDescription}
                        </p>
                        {/* Credits Information */}
                        <div className="flex items-center mt-[20px]">
                            <span className="mr-4 font-semibold">
                                Credit: {courseData.credit}
                            </span>
                            <span className="mr-4 font-semibold">
                                | Theory: {courseData.theory}
                            </span>
                            <span className="mr-4 font-semibold">
                                | Practice: {courseData.practice}
                            </span>
                            <span className="mr-4 font-semibold">
                                | Practice: {courseData.internship}
                            </span>
                        </div>
                    </div>
                    {/* Course Logo */}
                    <div className="ml-[88px]">
                        <Image
                            src={courseData.courseLogo}
                            alt="Course Logo"
                            width={215}
                            height={215}
                            className="w-[215px] h-[215px]"
                        />
                    </div>
                </section>
                {/* Instructor and Students Section */}
                <div className="flex items-center mt-[20px] mx-[90px]">
                    {/*<Image*/}
                    {/*    className="w-[60px] h-[60px] rounded-full mr-4"*/}
                    {/*    src={courseData.instructor.image}*/}
                    {/*    alt="Instructor"*/}
                    {/*    width={60}*/}
                    {/*    height={60}*/}
                    {/*/>*/}
                    <div>
                        <p className="font-bold text-[20px] text-lms-primary">
                            {courseData.instructorName}
                        </p>
                        <p className="text-lms-gray-80 text-[18px]">
                            {courseData.position}
                        </p>
                    </div>
                    {/* Student Images and Class Details */}
                    <div className="flex items-center ml-[88px]">
                        {/*<div className="flex -space-x-6 items-center">*/}
                        {/*    {courseData.studentImages.map((src, index) => (*/}
                        {/*        <Image*/}
                        {/*            key={index}*/}
                        {/*            src={src}*/}
                        {/*            alt={`Student ${index + 1}`}*/}
                        {/*            width={40}*/}
                        {/*            height={40}*/}
                        {/*            className="h-[40px] w-[40px] rounded-full object-cover ring-2 ring-white"*/}
                        {/*        />*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<div className="flex items-center ml-2">*/}
                        {/*    <div className="mr-2 font-bold">*/}
                        {/*        {courseData.studentsJoined}*/}
                        {/*        <div className="text-lms-gray-80">Students Joined</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="mx-[100px] mt-5">*/}
                        {/*    <span className="text-lms-gray-80 font-bold">Class Start:</span>*/}
                        {/*    <span className="ml-2 font-bold">{courseData.classStart}</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            <div className="p-5 mx-[100px]">
                <BreadcrumbWithCustomSeparator/>
            </div>
            <div className="mx-[100px]">
                <TabComponent/>
            </div>
        </main>
    );
}