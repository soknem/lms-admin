import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getDegree,
  getFaculties,
  getStudyProgram,
  getSubject,
} from "@/lib/endpoints/MokApi";
import { FacultyTable } from "@/components/adminComponent/faculties/faculty/data-table";
import { facultyColumns } from "@/components/adminComponent/faculties/faculty/columns";
import { DegreeTable } from "@/components/adminComponent/faculties/degree/data-table";
import { degreeColumns } from "@/components/adminComponent/faculties/degree/columns";
import { StudyProgramTable } from "@/components/adminComponent/faculties/studygrogram/data-table";
import { studyProgramColumns } from "@/components/adminComponent/faculties/studygrogram/columns";
import { SubjectTable } from "@/components/adminComponent/faculties/subject/data-table";
import { subjectColumns } from "@/components/adminComponent/faculties/subject/columns";

export default async function page() {
  const facData = await getFaculties();
  const deData = await getDegree();
  const stuData = await getStudyProgram();
  const subData = await getSubject();

  return (
    <section className="flex flex-col h-full w-full p-9">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-primary">Faculty Management</h1>
        <Tabs defaultValue="faculty" className="w-full">
          <TabsList>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="degree">Degree</TabsTrigger>
            <TabsTrigger value="study-program">Study Program</TabsTrigger>
            <TabsTrigger value="subject">Subject</TabsTrigger>
          </TabsList>
          <TabsContent value="faculty">
            <FacultyTable columns={facultyColumns} data={facData} />
          </TabsContent>
          <TabsContent value="degree">
            <DegreeTable columns={degreeColumns} data={deData} />
          </TabsContent>
          <TabsContent value="study-program">
            <StudyProgramTable columns={studyProgramColumns} data={stuData} />
          </TabsContent>
          <TabsContent value="subject">
            <SubjectTable columns={subjectColumns} data={subData} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
