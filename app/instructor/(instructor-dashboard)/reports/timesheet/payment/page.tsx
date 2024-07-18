'use client'
import { PaymentColumns } from "@/components/instructorcomponent/reports/timesheet/payment/columns";
import { PaymentDataTable } from "@/components/instructorcomponent/reports/timesheet/payment/data-table";
import { useEffect } from "react";
import { useGetPaymentQuery } from "@/lib/features/instructor/report/timesheet/payment/payment";
import { PaymentType } from "@/lib/types/instructor/timesheet";

// Define TimesheetType if not already defined

export default function Payment() {
    const { data, error } = useGetPaymentQuery();

    // Handle undefined data by providing a fallback value
    const paymentData: PaymentType[] = data?.content || [];

    // Log data content for debugging
    useEffect(() => {
    }, [data]);



    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <PaymentDataTable columns={PaymentColumns} data={paymentData} />
        </main>
    );
}
