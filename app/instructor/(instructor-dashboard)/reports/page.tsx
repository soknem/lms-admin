import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";
import TabReportComponent from "@/components/instructorcomponent/reports/timesheet/TabReportComponent";
import React from "react";

export default function Timesheet() {
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Timesheet</h2>
      <div className="ml-[1220px]">
        <DateComponent />
      </div>
      <div className="">
        <TabReportComponent />
      </div>
    </main>
  );
}
