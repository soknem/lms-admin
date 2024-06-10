import { DateComponent } from '@/components/instructorComponent/reports/timesheet/DateComponent'
import TabReportComponent from '@/components/instructorComponent/reports/timesheet/TabReportComponent'
import React from 'react'

export default function timesheet() {
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Timesheet</h2>
      <div className="ml-[1220px]">
        <DateComponent />
      </div>
      <div className="">
        <TabReportComponent />
      </div>
    </main>
  )
}
