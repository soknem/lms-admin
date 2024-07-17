"use client"

import {paymentColumns} from "@/components/admincomponent/payments/columns";
import {PaymentTable} from "@/components/admincomponent/payments/data-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectError,
    selectLoading,
    selectPayment,
    setPayments
} from "@/lib/features/admin/payment-management/paymentSlice";
import {useGetPaymentsQuery} from "@/lib/features/admin/payment-management/payment";

export default function Payments() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: paymentsData,
        error: paymentsError,
        isLoading: paymentsLoading,
    } = useGetPaymentsQuery({page: 0, pageSize: 10});
    const payments = useSelector((state: RootState) => selectPayment(state));


    useEffect(() => {
        if (paymentsData) {
            dispatch(setPayments(paymentsData.content));
        }
    }, [paymentsData, dispatch]);

    return (
        <main className="flex flex-col h-full w-full p-9 gap-6">
            <h2 className="text-4xl text-lms-primary font-bold">Payments</h2>
            <PaymentTable columns={paymentColumns} data={payments}/>
        </main>
    );
}
