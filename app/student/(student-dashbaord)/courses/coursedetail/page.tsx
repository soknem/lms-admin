import TabComponent from "@/components/studentComponent/coursedetail/TabComponent";
import { BreadcrumbWithCustomSeparator } from "@/components/studentcomponent/coursedetail/BreadcrumbComponent";
import CourseDetailHeader from "@/components/studentcomponent/coursedetail/CourseDetailHeader";
import React from "react";

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
