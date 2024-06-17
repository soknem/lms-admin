import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";
import TabReportComponent from "@/components/instructorComponent/reports/timesheet/TabReportComponent";
import React from "react";

export default function Report() {
  return (
    <main className=" h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Timesheet</h2>
      <div className="mt-4">
        <DateComponent />
        <TabReportComponent /></div>
        

    </main>
  );
}
