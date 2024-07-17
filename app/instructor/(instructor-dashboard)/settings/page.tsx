'use client'
import { useGetDataSettingInstructorQuery } from '@/lib/features/instructor/course/instructorCourse'
import {InstructorSettingRequest} from "@/lib/types/instructor/setting";
import {EditInstructorProForm} from "@/components/instructorcomponent/setting/EditInsPro";
import React , {useEffect, useState} from 'react';
import LoadingComponent from "@/app/(auth)/loading";

export default function SettingInstructor() {

    const { data , isLoading   } = useGetDataSettingInstructorQuery();
    const [instructorSetting, setInstructorSetting] = useState<InstructorSettingRequest | null>(null);


    useEffect(() => {
        if (data) {
            setInstructorSetting({
                gender: data.gender,
                profileImage: data.profileImage,
                phoneNumber: data.phoneNumber,
                bio: data.bio,
                linkTelegram: data.linkTelegram,
                linkGit: data.linkGit,
                linkLinkedin: data.linkLinkedin,
                currentAddress: data.currentAddress,
                birthPlace: data.birthPlace
            });
        }
    }, [data]);



    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (!instructorSetting) {
        return <div>No data available.</div>;
    }

    return (
        <main className="flex flex-col w-full gap-9 p-9">
            <h2 className="text-4xl text-lms-primary font-bold uppercase ">Setting Instructor</h2>
            <section className="flex flex-grow  gap-6 px-6 bg-white rounded-[10px] justify-center items-start">
                <EditInstructorProForm {...instructorSetting}/>
            </section>
        </main>
    );
}