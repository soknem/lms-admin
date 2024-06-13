import React from "react";
// @ts-ignore
import {CourseAssessmentColumns} from "@/components/adminComponent/academics/assesments/eachCourse/columns";
// @ts-ignore
import {CourseAssesmentDataTable} from "@/components/adminComponent/academics/assesments/eachCourse/data-table";
import {courseAssessmentType} from "@/lib/types/admin/academics";
import courseAssesment from "@/app/admin/(admin-dashboard)/academics/assessments/data/courseAssesment.json";
import {InstructorCourseAssesmentDataTable} from "@/components/instructorcomponent/assessments/data-table";
import {InstructorCourseAssessmentColumns} from "@/components/instructorcomponent/assessments/columns";

export default function Academics() {
  const courseData : courseAssessmentType[] = courseAssesment;
  return <main className="flex flex-col h-full w-full p-9">
    <h2 className="text-4xl text-lms-primary font-bold">Assessment</h2>
    <InstructorCourseAssesmentDataTable columns={InstructorCourseAssessmentColumns} data={courseData} />
  </main>;
}
