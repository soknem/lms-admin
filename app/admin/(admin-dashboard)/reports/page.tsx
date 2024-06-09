import AcademicComponent from "@/components/adminComponent/reports/AcademicComponent";
import GenerationComponent from "@/components/adminComponent/reports/GenerationComponent";
import MajorComponent from "@/components/adminComponent/reports/MajorComponent";
import TabComponent from "@/components/adminComponent/reports/TabComponent";
import ClassComponent from "@/components/instructorComponent/reports/attendence/ClassComponent";
import CourseComponent from "@/components/instructorComponent/reports/attendence/CourseComponent";
import SemesterComponent from "@/components/instructorComponent/reports/attendence/SemesterComponent";
import { DataTable } from "@/components/instructorComponent/reports/timesheet/payment/TableComponent";
import React from "react";

export default function Report() {
  return (
    <main className="p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Reports</h2>
      <div className="ml-[750px] flex justify-between">
        <GenerationComponent />
          <AcademicComponent />
          <MajorComponent />
      </div>
              <TabComponent />

      
    </main>
  );
}
