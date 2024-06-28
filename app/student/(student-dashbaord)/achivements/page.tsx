'use client';

import React, {useEffect, useState} from "react";
import {FaBook} from "react-icons/fa6";
import {labelsTitle} from "@/lib/types/student/achievement/achievement";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetStudentAchievementQuery} from "@/lib/features/student/achievement/achievement";
import {
    selectLoading,
    setLoading,
    selectError,
    setError,
    setAchievements,
} from "@/lib/features/student/achievement/achievementSlice";


import AchievementTable from "@/components/studentcomponent/achievements/AchievementComponent";
import type {Achievement, YearOfStudy} from "@/lib/types/student/achievement/achievement";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";




export default function Achievement() {
    const dispatch = useDispatch<AppDispatch>();
    const {data = {}, error, isLoading} = useGetStudentAchievementQuery();
    const loading = useSelector(selectLoading);
    const fetchError = useSelector(selectError);
    const [allData, setData] = useState<Achievement | null>(null);




    useEffect(() => {
        if (Object.keys(data).length > 0) {
            dispatch(setLoading());
            dispatch(setAchievements(data));
            setData(data);
        }
        if (error) {
            dispatch(setError(error.toString()));
        }
    }, [data, error, dispatch]);

    if (!allData) {
        return <LoadingComponent/>;
    }

    const studentInfo = [
        allData.nameKh,
        allData.nameEn,
        allData.dob,
        allData.degree,
        allData.major,
    ];

    const totalCourses = data.yearOfStudiesStudents.reduce((total: number, yearOfStudy: YearOfStudy) => {
        return total + yearOfStudy.courses.length;
    }, 0);



    return (
        <main className="flex flex-col h-full w-full p-9">

            <section
                className="bg-lms-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Welcome back, {data?.nameEn} !
                    </h2>
                    <p className="text-lg text-slate-50">
                        Passionate about literature and creative writing.
                    </p>
                </div>
                <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-[60px] ">
                    {/* image */}
                    <div className="w-[150px] h-[150px] rounded-full shadow-lg">
                        <img
                            src={data?.profileImage || "https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"}
                            alt="studentProfile"
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>

                    {/* name and course*/}
                    <div className="flex flex-col justify-end">
                        <h3 className="text-3xl font-bold">{
                            data?.nameEn
                        }</h3>
                        <div className="flex items-center gap-3">
                            <FaBook className="w-4 h-4 text-lms-primary"/>
                            <p className="text-lg text-gray-800 font-semibold">{` ${totalCourses} courses `} </p>
                        </div>
                    </div>
                </section>
            </section>

            {/* Transcript */}
            <section
                className="bg-white w-full flex flex-col items-center justify-center p-9 lg:mt-24 rounded-xl gap-9">
                <div className="flex flex-col gap-4 ">
                    <h1 className="font-bold text-4xl text-center">
                        Center of Science and Technology Advanced Development
                    </h1>
                    <p className="text-2xl font-semibold text-center">
                        OFFICIAL TRANSCRIPT
                    </p>
                </div>

                {/* Information */}
                <div className="flex w-full lg:justify-between p-9 lg:flex-row md:flex-col  md:justify-center">



                    {/* student info */}
                    <div className="flex flex-col gap-2 w-[700px] px-9 ">
                        <div className="flex justify-start items-center w-full gap-6">
                            <div className="flex flex-col gap-2 w-[25%] ">
                                {labelsTitle.map((label, index) => (
                                    <h2 key={index} className="text-xl font-medium ">
                                        {label}
                                    </h2>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                {labelsTitle.map((index) => (
                                    <p key={index} className="text-xl font-bold">
                                        :
                                    </p>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 w-[50%]">
                                {
                                    studentInfo.map((info, index) => (
                                        <p key={index} className="text-xl font-medium">
                                            {info}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* student pic */}
                    <div className="flex justify-center px-9 lg:mt-0  mt-10 ">
                        <img
                            src={data?.avatar || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                            alt="student"
                            className="w-[180px] object-cover"
                        />
                    </div>


                </div>

                {/* Table */}
                <AchievementTable data={allData}/>

            </section>
        </main>
    );
}
