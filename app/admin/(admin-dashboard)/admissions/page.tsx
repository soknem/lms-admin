
import { admissionColumns } from "@/components/admincomponent/admissions/columns";
import { AdmissionTable } from "@/components/admincomponent/admissions/data-table";
import React from "react";
import {AdmissionType} from "@/lib/types/admin/admission";
import adsData from "@/components/admincomponent/admissions/adsData.json"

export default async function Admissions() {
  // const admData = await getAdmission();
    const admissionData : AdmissionType[] = adsData;
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Admissions</h2>
      
      <AdmissionTable columns={admissionColumns} data={admissionData} />
    </main>
  );
}
