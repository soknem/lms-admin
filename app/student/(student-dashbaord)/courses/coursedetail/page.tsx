import { BreadcrumbWithCustomSeparator } from "@/components/BreadcrumbComponent";
import TabComponent from "@/components/TabComponent";
import CurriculumComponent from "@/components/studentComponent/coursedetail-curriculum/CurriculumComponent";
import CourseDetail from "@/components/studentComponent/coursedetail-header/CourseDetail";

import React from "react";

export default function Course() {
  return (
    <main >
      <div className="max-w-full mx-auto p-10 bg-white rounded-lg shadow-md ">
        <CourseDetail />
      </div>
      <div className="p-10">
        <BreadcrumbWithCustomSeparator />
      <div className=" mt-5">
          <TabComponent/>
          </div>
          </div> 
      
      <div className="ml-10 bg-white rounded-xl">
        <CurriculumComponent/>
      </div>
    </main>
  );
}
