import React from "react";
import ReportsComponent from "@/components/adminComponent/reports/ReportComponent";
import ReportComponent from "@/components/instructorComponent/reports/payment/HeaderComponent";
import TabReportComponent from "@/components/instructorComponent/reports/TabReportComponent";
import { columns, invoices } from "./payment/columns";
import { DataTable } from "@/components/instructorComponent/reports/payment/TableComponent";
import { Table } from "@/components/ui/table";
import { DateComponent } from "@/components/instructorComponent/reports/DateComponent";

export default function page() {
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-primary font-bold">Timesheet</h2>
      <div className="ml-[1220px]">
        <DateComponent />
        </div>
      

      <div className="">
        <TabReportComponent />
      </div>
    </main>
  );
}
