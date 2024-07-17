"use client";

import React, { useState, useEffect } from "react";
import { EditStudentProForm } from "@/components/studentcomponent/setting/EditStuPro";
import { useGetStudentSettingsQuery } from "@/lib/features/student/setting/StudentSetting";
import LoadingComponent from "@/app/(auth)/loading";
import {StudentSetting} from "@/lib/types/student/StudentSetting";

export default function SettingStudent() {
    const { data, isLoading, error } = useGetStudentSettingsQuery();
    const [studentSetting, setStudentSetting] = useState<StudentSetting | null>(null);

    useEffect(() => {
        if (data) {
            setStudentSetting({
                gender: data.gender,
                profileImage: data.profileImage,
                phoneNumber: data.phoneNumber,
                biography: data.biography,
                currentAddress: data.currentAddress,
                familyPhoneNumber: data.familyPhoneNumber,
                guardianRelationShip: data.guardianRelationShip,
                birthPlace: data.birthPlace,
            });
        }
    }, [data]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error loading student settings.</div>;
    }

    if (!studentSetting) {
        return <div>No data available.</div>;
    }

    // const handleFormSubmit = () => {
    //     refetch();
    // };

    return (
        <main className="flex flex-col w-full gap-9 p-9 relative">
            <h2 className="text-4xl text-lms-primary font-bold">Setting</h2>
            <section className="flex flex-grow gap-6 p-6 bg-white rounded-[10px] justify-center items-start">
                <EditStudentProForm
                    {...studentSetting}
                />
            </section>
        </main>
    );
}
