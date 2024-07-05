// CourseDetailHeader.tsx
"use client";
import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {CourseDetail} from "@/lib/types/student/course"

// Assuming you pass `allData` as a prop to this component
interface CourseDetailHeaderProps {
    allData: CourseDetail;
}

export default function CourseDetailHeader({allData}: CourseDetailHeaderProps) {
    const router = useRouter();
    const handleNavigate = () => {
        router.push("/instructor/courses/int-profile");
    };

    return (
        <main>
            <section className="mx-[90px] flex flex-col-2 ">
                <div className="h-[250px]">
                    <span className="px-[25px] mx-2 py-1 text-sm font-semibold text-white bg-lms-secondary rounded-full mb-10">
                        Year {allData.year}
                    </span>


                    <span className="px-[25px] py-1 text-sm font-semibold text-white bg-lms-secondary rounded-full mb-10">
                        Semester {allData.semester}
                    </span>


                    <h2 className="text-[40px] font-bold text-lms-black90 mt-[14px]">
                        {allData.courseTitle.toUpperCase()}
                    </h2>
                    <p className="text-lms-gray-80 w-[803px] text-[18px] mt-[14px]">
                        {allData.courseDescription}
                    </p>
                    <div className="flex items-center mt-[20px]">
            <span className="mr-4 font-semibold">
              Credit: {allData.credit}
            </span>
                        <span className="mr-4 font-semibold">
              | Theory: {allData.theory}
            </span>
                        <span className="mr-4 font-semibold">
              | Practice: {allData.practice}
            </span>
                    </div>
                </div>
                <div className="ml-[88px]">
                    <Image
                        src={`/path/to/course/logos/${allData.courseLogo}`}
                        alt="Course Logo"
                        width={215}
                        height={215}
                        className="w-[215px] h-[215px]"
                    />
                </div>
            </section>
            <div className="flex items-center -[20px]  mx-[90px]">
                <Image
                    className="w-[60px] h-[60px] rounded-full  mr-4"
                    onClick={handleNavigate}
                    src={`/path/to/instructor/images/${allData.userProfileImage || 'default.jpg'}`}
                    alt="Instructor"
                    width={60}
                    height={60}
                />
                <div>
                    <p className="font-bold text-[20px] text-lms-primary">
                        {allData.instructorName || 'Unknown Instructor'}
                    </p>
                    <p className="text-lms-gray-80 text-[18px]">
                        {allData.position || 'Unknown Position'}
                    </p>
                </div>
                <div className="flex items-center ml-[88px]">
                    <div className="flex -space-x-6 items-center">
                        {allData.studentProfileImage.map((src, index) => (
                            <Image
                                key={index}
                                src={src ? `/path/to/student/images/${src}` : '/default-student.jpg'}
                                alt={`Student ${index + 1}`}
                                width={40}
                                height={40}
                                className="h-[40px] w-[40px] rounded-full object-cover ring-2 ring-white"
                            />
                        ))}
                    </div>
                    <div className="flex items-center ml-2">
                        <div className="mr-2 font-bold">
                            {/* Assuming you have studentsJoined data somewhere */}
                            <div className="text-lms-gray-80">Students Joined</div>
                        </div>
                    </div>
                    <div className="mx-[100px] mt-5">
                        <span className="text-lms-gray-80 font-bold">Class Start:</span>
                        <span className="ml-2 font-bold ">
                            {allData.classesStart?.toLocaleDateString() || 'Unknown'}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}
