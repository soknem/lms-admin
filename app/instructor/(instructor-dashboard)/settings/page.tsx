import { EditStuProForm } from "@/components/instructorcomponent/setting/EditInsPro";
import { useGetStudentSettingsQuery } from "@/lib/features/student/setting/StudentSetting";
import LoadingComponent from "@/app/(auth)/loading";
import React from "react";
import { PiCertificateFill } from "react-icons/pi";
export default function Setting() {
    const { data, isLoading, error } = useGetStudentSettingsQuery();

    const studentSetting = {
        gender: data.gender,
        profileImage: data.profileImage,
        phoneNumber: data.phoneNumber,
        biography: data.biography,
        currentAddress: data.currentAddress,
        familyPhoneNumber: data.familyPhoneNumber,
        guardianRelationShip: data.guardianRelationShip,
        birthPlace: data.birthPlace,
    };


    return (
    <main className="flex flex-col h-full w-full gap-9 p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Setting</h2>
      <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
        <EditStuProForm {...studentSetting}/>
      </section>

    </main>
  );
}
