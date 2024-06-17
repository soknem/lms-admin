import { paymentColumns } from "@/components/admincomponent/payments/columns";
import { PaymentTable } from "@/components/admincomponent/payments/data-table";
import React from "react";
import {PaymentType} from "@/lib/types/admin/payments";
import payData from "@/components/admincomponent/payments/payData.json"

export default async function Payments() {
  // const payData = await getPayment();
    const paymentData : PaymentType[] = payData;
  return (
    <main className="flex flex-col h-full w-full p-9 gap-6">
      <h2 className="text-4xl text-lms-primary font-bold">Payments</h2>
      <PaymentTable columns={paymentColumns} data={paymentData}/>
    </main>
  );
}
