import React from "react";
import ReportsComponent from "@/components/adminComponent/reports/student/ReportComponent";
import ReportComponent from "@/components/instructorComponent/reports/timesheet/payment/HeaderComponent";
import { columns, invoices } from "./timesheet/payment/columns";
import { DataTable } from "@/components/instructorComponent/reports/timesheet/payment/TableComponent";
import { Table } from "@/components/ui/table";
import { DateComponent } from "@/components/instructorComponent/reports/timesheet/DateComponent";
import TabReportComponent from "@/components/instructorComponent/reports/timesheet/TabReportComponent";

export default function Report() {
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
