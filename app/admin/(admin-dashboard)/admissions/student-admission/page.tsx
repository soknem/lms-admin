import { StudentAdmissionColumns } from "@/components/admincomponent/admissions/student-admission/columns";
import { StudentAdmissionTable } from "@/components/admincomponent/admissions/student-admission/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAdmission, getStudentAdmission } from "@/lib/endpoints/MokApi";
import Link from "next/link";
import React from "react";

export default async function Admissions() {
  const stuAdmData = await getStudentAdmission();
  return (
    <main className="flex flex-col h-full w-full p-9">
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
      <h2 className="text-4xl text-primary font-bold">Admissions</h2>
      <StudentAdmissionTable
        columns={StudentAdmissionColumns}
        data={stuAdmData}
      />
    </main>
  );
}
