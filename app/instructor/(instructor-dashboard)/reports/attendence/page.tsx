import ClassComponent from "@/components/instructorComponent/reports/attendence/ClassComponent";
import CourseComponent from "@/components/instructorComponent/reports/attendence/CourseComponent";
import { DateComponent } from "@/components/instructorComponent/reports/attendence/DateComponent";
import { DateEndComponent } from "@/components/instructorComponent/reports/attendence/DateEndComponent";
import SemesterComponent from "@/components/instructorComponent/reports/attendence/SemesterComponent";
import React from "react";
import { AttendenceTable,  } from "@/components/instructorComponent/reports/attendence/data-table";
import { paymentColumns } from "@/components/instructorComponent/reports/attendence/columns";
import { getPayment } from "@/lib/endpoints/MokApi";

export default async function Attendence() {
  const payData = await getPayment();
  return (
    <main className="flex flex-col h-full w-full p-9">
        <h2 className="text-4xl text-lms-primary font-bold py-5">
          Student Attendence
        </h2>
        <div className="flex gap-5">
          <DateComponent />
          <DateEndComponent />
          <ClassComponent />
          <CourseComponent />
          <SemesterComponent />
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
      <AttendenceTable columns={paymentColumns} data={payData} />
    </main>
  );
}
