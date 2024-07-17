'use client'
import {
    useGetStudentAchievementQuery,
    useGetYearOfStudyAchievementQuery
} from "@/lib/features/student/achievement/achievement";
import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";
import { StudentAchievement, YearOfStudyAchievement ,YearOfStudyAchievementContent } from "@/lib/types/student/achievement";
import AchievementTable from "@/components/studentcomponent/achievements/AchievementComponent";

export default function Achievement() {
    const { data: studentData, error: studentError, isLoading: isStudentLoading } = useGetStudentAchievementQuery();
    const { data: yearOfStudyData, error: yearOfStudyError, isLoading: isYearOfStudyLoading } = useGetYearOfStudyAchievementQuery();
    const [allData, setAllData] = useState<StudentAchievement | null>(null);
    const [yearOfStudy, setYearOfStudy] = useState<YearOfStudyAchievement | null>(null);


    useEffect(() => {
        if (studentData) {
            setAllData(studentData);
        }
    }, [studentData]);

    const totalCourses = yearOfStudyData?.content.reduce((total: number, yearOfStudy: YearOfStudyAchievementContent) => total + yearOfStudy.course.length, 0) || 0;


    console.log(" Year of study data", yearOfStudyData);
    const studentTitle = [
        "Name (KH)",
        "Name (EN)",
        "Date of Birth",
        "Degree",
        "Major"
    ];

    const studentInfo = allData ? [
        allData.nameKh || "Undefined",
        allData.nameEn || "Undefined" ,
        allData.dob || "Undefined",
        allData.degree || "Undefined",
        allData.major || "Undefined",
    ] : [];

    if (isStudentLoading || isYearOfStudyLoading) {
        return <LoadingComponent />;
    }


    return (
        <main className="flex flex-col h-full w-full p-9">
            <section className="bg-lms-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Welcome back, {allData?.nameEn}!
                    </h2>
                    <p className="text-lg text-slate-50">
                        Passionate about literature and creative writing.
                    </p>
                </div>
                <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-[60px]">
                    <div className="w-[150px] h-[150px] rounded-full shadow-lg">
                        <img
                            src={allData?.profileImage || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                            alt="studentAvatar"
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <h3 className="text-3xl font-bold">{allData?.nameEn || "Undefined"}</h3>
                        <div className="flex items-center gap-3">
                            <FaBook className="w-4 h-4 text-lms-primary" />
                            <p className="text-lg text-gray-800 font-semibold">{ totalCourses || 0} Courses</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className="bg-white w-full flex flex-col items-center justify-center p-9 lg:mt-24 rounded-xl gap-9">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-4xl text-center">
                        Center of Science and Technology Advanced Development
                    </h1>
                    <p className="text-2xl font-semibold text-center">
                        OFFICIAL TRANSCRIPT
                    </p>
                </div>
                <div className="flex w-full lg:justify-between p-9 lg:flex-row md:flex-col md:justify-center">
                    <div className="flex flex-col gap-2 w-[700px] px-9">
                        <div className="flex justify-start items-center w-full gap-6">
                            <div className="flex flex-col gap-2 w-[25%]">
                                {studentTitle.map((label, index) => (
                                    <h2 key={index} className="text-xl font-medium">
                                        {label}
                                    </h2>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {["", "", "", "", ""].map((_, index) => (
                                    <p key={index} className="text-xl font-bold">
                                        :
                                    </p>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 w-[50%]">
                                {studentInfo.map((info, index) => (
                                    <p key={index} className="text-xl font-medium">
                                        {info}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center px-9 lg:mt-0 mt-10">
                        <img
                            src={allData?.avatar || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                            alt="studentProfileImage"
                            className="w-[180px] object-cover"
                        />
                    </div>
                </div>
                <AchievementTable allData={yearOfStudyData}/>
            </section>
        </main>
    );
}