import {  TimesheetType } from "@/lib/types/instructor/timesheet";
import payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/data/payment.json";
// @ts-ignore
import { PaymentDataTable } from "@/components/instructorcomponent/reports/timesheet/payment/data-table";
// @ts-ignore
import { PaymentColumns } from "@/components/instructorcomponent/reports/timesheet/payment/columns";

export default function Payment() {
  const paymentData: TimesheetType[] = payment;
  return (
    <main className="flex flex-col gap-4 h-full w-full p-9">
      <PaymentDataTable columns={PaymentColumns} data={paymentData} />
    </main>
  );
}
