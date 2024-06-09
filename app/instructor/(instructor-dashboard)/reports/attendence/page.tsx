import React from "react";
import { getPayment } from "@/lib/endpoints/MokApi";
import { LectureType } from "@/lib/types/admin/academics";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json";
import { DateStartComponent } from "@/components/instructorcomponent/reports/attendence/DateStartComponent";
import { DateEndComponent } from "@/components/instructorcomponent/reports/attendence/DateEndComponent";
import { Filter } from "@/components/instructorcomponent/reports/attendence/Filter";
import { LectureColumns } from "@/components/admincomponent/academics/lectures/LectureColumns";
import { AttendenceTable } from "@/components/instructorcomponent/reports/attendence/data-table";
import { paymentColumns } from "@/components/instructorcomponent/reports/attendence/columns";

export default async function Attendence() {
  const payData = await getPayment();
  const data: LectureType[] = lectures;

  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold py-5">
        Student Attendence
      </h2>
      <div className="flex gap-4">
        <div className="flex gap-5">
          <DateStartComponent />
          <DateEndComponent />
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
        <Filter columns={LectureColumns} data={data} />
      </div>

      <AttendenceTable columns={paymentColumns} data={payData} />
    </main>
  );
}
