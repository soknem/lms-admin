'use client'
import payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/data/payment.json";
import { PaymentColumns } from "@/components/instructorcomponent/reports/timesheet/payment/columns";
import { PaymentDataTable } from "@/components/instructorcomponent/reports/timesheet/payment/data-table";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useGetPaymentQuery } from "@/lib/features/instructor/report/timesheet/payment/payment";
import { selectPayments } from "@/lib/features/instructor/report/timesheet/payment/paymentSlice";
import { setPayments } from "@/lib/features/instructor/report/timesheet/payment/paymentSlice";
import { PaymentType } from "@/lib/types/instructor/timesheet";

// Define TimesheetType if not already defined

export default function Payment() {
    const dispatch = useDispatch();
    const { data, error } = useGetPaymentQuery();

    // Handle undefined data by providing a fallback value
    const paymentData: PaymentType[] = data?.content || [];

    // Log data content for debugging
    useEffect(() => {
        if (data) {
            console.log(data.content);
        }
    }, [data]);

    // Effect to update Redux store on data change
    useEffect(() => {
        if (data && data.content) {
            dispatch(setPayments(data.content));
        }
        if (error) {
            console.error("Failed to load teaching", error);
        }
    }, [data, error, dispatch]);

    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <PaymentDataTable columns={PaymentColumns} data={paymentData} />
        </main>
    );
}
