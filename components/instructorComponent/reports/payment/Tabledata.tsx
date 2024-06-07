import React from "react";
import ReportsComponent from "@/components/adminComponent/reports/ReportComponent";
import ReportComponent from "@/components/instructorComponent/reports/payment/HeaderComponent";
import TabReportComponent from "@/components/instructorComponent/reports/TabReportComponent";
import {
  columns,
  invoices,
} from "../../../../app/instructor/(instructor-dashboard)/reports/payment/columns";
import { DataTable } from "@/components/instructorComponent/reports/payment/TableComponent";
import { Table } from "@/components/ui/table";
async function getinvoices(): Promise<invoices[]> {
  const res = await fetch(
    " https://665fcb9c5425580055b0e6a1.mockapi.io/api/invoices"
  );
  const data = await res.json();
  return data;
}
export default async function Tabledata() {
  const data = await getinvoices();
  return <DataTable columns={columns} data={data} />;
}
