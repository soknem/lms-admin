import React from "react";
import {courseAssessmentTableType, courseAssessmentType} from "@/lib/types/admin/academics";
import courseAssesment from "@/app/admin/(admin-dashboard)/academics/assessments/data/courseAssesment.json";
import { InstructorCourseAssessmentColumns } from "@/components/instructorcomponent/assessments/columns";
import { InstructorCourseAssesmentDataTable } from "@/components/instructorcomponent/assessments/data-table";

export default function Academics() {
  // const courseData : courseAssessmentTableType[] = courseAssesment;
  return <main className="flex flex-col h-full w-full p-9">
    <h2 className="text-4xl text-lms-primary font-bold">Assessment</h2>
    {/*<InstructorCourseAssesmentDataTable columns={InstructorCourseAssessmentColumns} data={courseData} />*/}
  </main>;
}
