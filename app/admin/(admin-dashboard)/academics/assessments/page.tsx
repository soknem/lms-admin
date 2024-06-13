import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// transcript import
import { TranscriptType } from "@/lib/types/admin/academics";
import transcripts from "@/app/admin/(admin-dashboard)/academics/assessments/data/transcripts.json"


//each semester import
import { semesterAssessementType } from "@/lib/types/admin/academics";
import semesterAssessments from "@/app/admin/(admin-dashboard)/academics/assessments/data/semesterAssessments.json"

//each course import
import {courseAssessmentType} from "@/lib/types/admin/academics";
import courseAssesment from "@/app/admin/(admin-dashboard)/academics/assessments/data/courseAssesment.json"


import React from "react";
// @ts-ignore
import { TranscriptDataTable } from "@/components/admincomponent/academics/assesments/transcript/data-table";
// @ts-ignore
import { TranscriptColumns } from "@/components/admincomponent/academics/assesments/transcript/columns";
// @ts-ignore
import { CourseAssesmentDataTable } from "@/components/admincomponent/academics/assesments/eachCourse/data-table";
// @ts-ignore
import { CourseAssessmentColumns } from "@/components/admincomponent/academics/assesments/eachCourse/columns";
import {SemesterDataTable} from "@/components/adminComponent/academics/assesments/eachSemester/data-table";
import {
  eachSemesterColumn,
} from "@/components/adminComponent/academics/assesments/eachSemester/columns";
// @ts-ignore
import { useTable } from '@tanstack/react-table';

export default function Assessment() {

  const transcriptData : TranscriptType[] = transcripts;

  const semesterData : semesterAssessementType[] = semesterAssessments;

  const courseData : courseAssessmentType[] = courseAssesment;


  // @ts-ignore
  return (
    <main className="flex flex-col gap-4 h-full w-full p-9">
      <h2 className="text-3xl text-lms-primary font-bold">Assesments</h2>
      <Tabs defaultValue="transcript" className="w-full">

        <TabsList className="grid w-[400px] grid-cols-3">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="semester">Each Semester</TabsTrigger>
          <TabsTrigger value="course">Each Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript">
          <TranscriptDataTable columns={TranscriptColumns} data={transcriptData} />
        </TabsContent>

        <TabsContent value="semester" >
           <SemesterDataTable columns={eachSemesterColumn} data={semesterData} />
        </TabsContent>

        <TabsContent value="course" >
          <CourseAssesmentDataTable columns={CourseAssessmentColumns} data={courseData} />
         
        </TabsContent>
      </Tabs>
    </main>
  );
}