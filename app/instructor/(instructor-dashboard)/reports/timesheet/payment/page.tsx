'use client'
import React, { useState } from "react";
import PaymentComponent from "@/components/instructorcomponent/reports/timesheet/payment/PaymentComponent";
import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";

export default function PaymentPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="relative h-full">
            <div className="absolute top-[-20px] left-0 right-0"> {/* Adjust the position with top-[-20px] */}
                <DateComponent selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            <div className="mt-8"> {/* Add margin to ensure there's space for DateComponent */}
                <PaymentComponent selectedDate={selectedDate} />
            </div>
        </div>
    );
}
