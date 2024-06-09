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
import { TranscriptDataTable } from "@/components/admincomponent/academics/assesments/transcript/data-table";
import { TranscriptColumns } from "@/components/admincomponent/academics/assesments/transcript/columns";
import { CourseAssesmentDataTable } from "@/components/admincomponent/academics/assesments/eachCourse/data-table";
import { CourseAssessmentColumns } from "@/components/admincomponent/academics/assesments/eachCourse/columns";

export default function Assessment() {

  const transcriptData : TranscriptType[] = transcripts;

  const semesterData : semesterAssessementType[] = semesterAssessments;

  // const semesterColumns = SemesterColumns(semesterData);

  const courseData : courseAssessmentType[] = courseAssesment;


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

        <TabsContent value="semester" className="bg-white p-6 space-y-4 rounded-lg">
          {/* <SemesterDataTable columns={semesterColumns} data={semesterData} /> */}
        </TabsContent>

        <TabsContent value="course" >
          <CourseAssesmentDataTable columns={CourseAssessmentColumns} data={courseData} />
         
        </TabsContent>
      </Tabs>
    </main>
  );
}