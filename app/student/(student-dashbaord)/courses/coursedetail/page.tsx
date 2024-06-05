import { BreadcrumbWithCustomSeparator } from "@/components/studentComponent/coursedetail/BreadcrumbComponent";
import TabComponent from "@/components/studentComponent/coursedetail/TabComponent";
import React from "react";
import CourseDetailHeader from "@/components/studentComponent/coursedetail/CourseDetailHeader";

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
        <TabComponent />
      </div>
    </main>
  );
}
