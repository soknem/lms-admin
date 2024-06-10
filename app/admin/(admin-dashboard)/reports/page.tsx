import TabComponent from "@/components/adminComponent/reports/TabComponent";
import { getPayment } from "@/lib/endpoints/MokApi";
import { LectureType } from "@/lib/types/admin/academics";
import React from "react";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json";
import { Filter } from "@/components/instructorComponent/reports/attendence/Filter";
import { LectureColumns } from "@/components/adminComponent/academics/lectures/LectureColumns";
import { FilterAdmin } from "@/components/adminComponent/reports/Filter";
import ReportComponent from "@/components/adminComponent/reports/student/ReportComponent";

export default async function Report() {
  const payData = await getPayment();
  const data: LectureType[] = lectures;
  return (
    <main className="p-9 ">
      <h2 className="text-4xl text-lms-primary font-bold">Reports</h2>
      <div className="ml-[900px] ">
        <FilterAdmin columns={LectureColumns} data={data} />
      </div>

      <TabComponent />
    </main>
  );
}
