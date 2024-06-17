import { StudentAdmissionColumns } from "@/components/admincomponent/admissions/student-admission/columns";
import { StudentAdmissionTable } from "@/components/admincomponent/admissions/student-admission/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import { StudentAdmissionType} from "@/lib/types/admin/admission";
import stuAdsData from "@/components/admincomponent/admissions/student-admission/stuAdsData.json"

export default async function Admissions() {
  // const stuAdmData = await getStudentAdmission();
    const stuAdmissionData : StudentAdmissionType[] = stuAdsData;
  return (
    <main className="flex flex-col h-full w-full gap-2 p-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/admin/admissions" legacyBehavior>
                <a>ADMISSION</a>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <h3 className="font-semibold text-lms-primary">2022-2023</h3>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-4xl font-bold text-lms-primary">
        Admissions
      </h2>
      <StudentAdmissionTable
        columns={StudentAdmissionColumns}
        data={stuAdmissionData}
      />
    </main>
  );
}
