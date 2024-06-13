// import TabReportComponent from "@/components/instructorComponent/reports/timesheet/TabReportComponent";
// import { BreadcrumbWithCustomSeparator } from "@/components/studentComponent/coursedetail/BreadcrumbComponent";
// import CourseDetailHeader from "@/components/studentComponent/coursedetail/CourseDetailHeader";
// @ts-ignore
import TabReportComponent from "@/components/instructorcomponent/reports/timesheet/TabReportComponent";
// @ts-ignore
import { BreadcrumbWithCustomSeparator } from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
// @ts-ignore
import CourseDetailHeader from "@/components/studentcomponent/coursedetail/CourseDetailHeader";
import React from "react";
import TabComponent from "@/components/studentComponent/coursedetail/TabComponent";

export default function coursedetail() {
  return (
    <main>
      <div className="bg-white py-[35px]">
        <CourseDetailHeader />
      </div>
      <div className="p-5 mx-[100px]">
        <BreadcrumbWithCustomSeparator />
      </div>
      <div className=" mx-[100px] ">
        <TabComponent/>
      </div>
    </main>
  );
}
