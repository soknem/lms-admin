// @ts-ignore
import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";
import React from "react";
import TabReportComponent from "@/components/instructorComponent/reports/timesheet/TabReportComponent";

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
