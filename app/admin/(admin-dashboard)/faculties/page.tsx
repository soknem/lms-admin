import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getDegree,
  getFaculties,
  getStudyProgram,
  getSubject,
} from "@/lib/endpoints/MokApi";
// @ts-ignore
import { FacultyTable } from "@/components/admincomponent/faculties/faculty/data-table";
// @ts-ignore
import { facultyColumns } from "@/components/admincomponent/faculties/faculty/columns";
// @ts-ignore
import { DegreeTable } from "@/components/admincomponent/faculties/degree/data-table";
// @ts-ignore
import { degreeColumns } from "@/components/admincomponent/faculties/degree/columns";
// @ts-ignore
import { StudyProgramTable } from "@/components/admincomponent/faculties/studygrogram/data-table";
// @ts-ignore
import { studyProgramColumns } from "@/components/admincomponent/faculties/studygrogram/columns";
// @ts-ignore
import { SubjectTable } from "@/components/admincomponent/faculties/subject/data-table";
// @ts-ignore
import { subjectColumns } from "@/components/admincomponent/faculties/subject/columns";

export default async function Page() {
  const facData = await getFaculties();
  const deData = await getDegree();
  const stuData = await getStudyProgram();
  const subData = await getSubject();

  return (
    <section className="flex flex-col h-full w-full p-9 dark:bg-gray-900 dark:text-black">
      <section>
        <h1 className="mb-6 text-3xl font-bold text-lms-primary dark:text-blue-400">
          Faculty Management
        </h1>


        <Tabs defaultValue="faculty" className="w-full">

          <TabsList className="dark:bg-gray-800">

            <TabsTrigger value="faculty" className="dark:text-gray-300 dark:hover:text-white">
              Faculty
              </TabsTrigger>
            <TabsTrigger value="degree" className="dark:text-gray-300 dark:hover:text-white">
              Degree
              </TabsTrigger>
            <TabsTrigger value="study-program" className="dark:text-gray-300 dark:hover:text-white">
              Study Program
              </TabsTrigger>
            <TabsTrigger value="subject" className="dark:text-gray-300 dark:hover:text-white">
              Subject
              </TabsTrigger>


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

      </section>
    </section>
  );
}
