'use client'
import payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/data/payment.json";
import { PaymentColumns } from "@/components/instructorcomponent/reports/timesheet/payment/columns";
import { PaymentDataTable } from "@/components/instructorcomponent/reports/timesheet/payment/data-table";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useGetPaymentQuery } from "@/lib/features/instructor/report/timesheet/payment/payment";
import { selectPayments } from "@/lib/features/instructor/report/timesheet/payment/paymentSlice";
import { setPayments } from "@/lib/features/admin/payment-management/paymentSlice";
import { PaymentType } from "@/lib/types/admin/payments";

// Define TimesheetType if not already defined
type TimesheetType = {
    date: string;
    lectureStartTime: string;
    lectureEndTime: string;
    theoryHours: number;
    theoryRate: number | null;
    pwHours: number;
    pwRate: number | null;
    totalAmount: number | null;
};

export default function Payment() {
    const dispatch = useDispatch();
    const { data, error } = useGetPaymentQuery();

    const paymentData: PaymentType[] = useSelector((state: RootState) => selectPayments(state));

    // Transform payment data to match TimesheetType
    const transformedPaymentData: TimesheetType[] = paymentData.map((item) => ({
        date: item.date,
        lectureStartTime: item.lectureStartTime,
        lectureEndTime: item.lectureEndTime,
        theoryHours: item.theoryHours,
        theoryRate: item.theoryRate,
        pwHours: item.pwHours,
        pwRate: item.pwRate,
        totalAmount: item.totalAmount,
    }));

    // Effect to update Redux store on data change
    useEffect(() => {
        if (data) {
            dispatch(setPayments(data.content));
        }
        if (error) {
            console.error("Failed to load teaching", error);
        }
    }, [data, error, dispatch]);

    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <PaymentDataTable columns={PaymentColumns} data={transformedPaymentData} />
        </main>
    );
}
