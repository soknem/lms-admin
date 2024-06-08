import { paymentColumns } from "@/components/admincomponent/payments/columns";
import { PaymentTable } from "@/components/admincomponent/payments/data-table";
import { getPayment } from "@/lib/endpoints/MokApi";
import React from "react";

export default async function Payments() {
  const payData = await getPayment();
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Payments</h2>
      <PaymentTable columns={paymentColumns} data={payData}/>
    </main>
  );
}
