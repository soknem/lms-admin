import {  TimesheetType } from "@/lib/types/instructor/timesheet";
import payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/data/payment.json";
// @ts-ignore
import { PaymentColumns } from "@/components/instructorComponent/reports/timesheet/payment/columns";
// @ts-ignore
import { PaymentDataTable } from "@/components/instructorComponent/reports/timesheet/payment/data-table";

export default function Payment() {
  const paymentData: TimesheetType[] = payment;
  return (
    <main className="flex flex-col gap-4 h-full w-full p-9">
      <PaymentDataTable columns={PaymentColumns} data={paymentData} />
    </main>
  );
}
