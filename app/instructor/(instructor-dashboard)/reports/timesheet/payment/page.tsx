'use client'
import { PaymentColumns } from "@/components/instructorcomponent/reports/timesheet/payment/columns";
import { PaymentDataTable } from "@/components/instructorcomponent/reports/timesheet/payment/data-table";
import { useEffect } from "react";
import { useGetPaymentQuery } from "@/lib/features/instructor/report/timesheet/payment/payment";
import { PaymentType } from "@/lib/types/instructor/timesheet";

type PaymentProps = {
    selectedDate: Date;
}

export default function Payment({ selectedDate }: PaymentProps) {
    const { data, error } = useGetPaymentQuery();

    const payments: PaymentType[] = data?.payments || [];

    useEffect(() => {
        console.log("PAYMENT DATA: ", data);
    }, [data]);

    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <PaymentDataTable columns={PaymentColumns} allData={payments} selectedDate={selectedDate || null} />
        </main>
    );
}