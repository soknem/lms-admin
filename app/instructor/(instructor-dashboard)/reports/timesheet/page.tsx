'use client';
import { useState } from 'react';
import TabReportComponent from "@/components/instructorcomponent/reports/timesheet/TabReportComponent";
import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";

export default function Report() {
    const [selectedDate, setSelectedDate] = useState(null);


    return (
        <main className=" h-full w-full p-9">
            <h2 className="text-4xl text-lms-primary h-full font-bold">Timesheet</h2>
            <div className="mt-4">
                <TabReportComponent/>
            </div>
        </main>
    );
}