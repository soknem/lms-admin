// Report.js
'use client'
import {DateComponent} from "@/components/instructorcomponent/reports/timesheet/DateComponent";
import TabReportComponent from "@/components/instructorcomponent/reports/timesheet/TabReportComponent";

export default function Report() {
    return (
        <main className="h-full w-full p-9 ">
            <h2 className="text-4xl border-gray-900 text-lms-primary font-bold">Timesheet</h2>
            <div className="mt-4">
                <TabReportComponent/>
            </div>
        </main>
    );
}
