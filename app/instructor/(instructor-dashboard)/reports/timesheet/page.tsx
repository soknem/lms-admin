import { DateComponent } from '@/components/instructorcomponent/reports/timesheet/DateComponent'
import TabReportComponent from '@/components/instructorcomponent/reports/timesheet/TabReportComponent'
import React from 'react'

export default function timesheet() {
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Timesheet</h2>
      <div className="flex justify-end">
        <DateComponent />
      </div>
      <div className="">
        <TabReportComponent />
      </div>
    </main>
  )
}
