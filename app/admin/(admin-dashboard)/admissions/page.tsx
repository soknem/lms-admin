import { admissionColumns } from "@/components/adminComponent/admissions/columns";
import { AdmissionTable } from "@/components/adminComponent/admissions/data-table";
import { getAdmission } from "@/lib/endpoints/MokApi";
import React from "react";

export default async function Admissions() {
  const admData = await getAdmission();
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Admissions</h2>
      
      <AdmissionTable columns={admissionColumns} data={admData} />
    </main>
  );
}
