import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSetupStudyProgram } from "@/lib/endpoints/MokApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
// @ts-ignore
import { SetupStudyProgramTable } from "@/components/admincomponent/faculties/studygrogram/setup-studyprogram/data-table";
// @ts-ignore
import { setupStudyProgramColumns } from "@/components/admincomponent/faculties/studygrogram/setup-studyprogram/columns";


export default async function page() {
  const setStudy = await getSetupStudyProgram();

  return (
    <section className="flex flex-col h-full w-full p-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/admin/faculties" legacyBehavior>
                <a> Study Program</a>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <h3 className="font-semibold text-lms-primary">SET UP</h3>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="mb-6 text-3xl font-bold text-lms-primary">
          Faculty Management
        </h1>
        <Tabs defaultValue="foundation-year" className="w-full">
          <TabsList>
            <TabsTrigger value="foundation-year">Foundation Year</TabsTrigger>
            <TabsTrigger value="second-year">Second Year</TabsTrigger>
            <TabsTrigger value="third-year">Third Year</TabsTrigger>
            <TabsTrigger value="fourth-year">Fourth Year</TabsTrigger>
          </TabsList>
          <TabsContent value="foundation-year">
            <SetupStudyProgramTable
              columns={setupStudyProgramColumns}
              data={setStudy}
            />
          </TabsContent>
          <TabsContent value="second-year">
            <SetupStudyProgramTable
              columns={setupStudyProgramColumns}
              data={setStudy}
            />
          </TabsContent>
          <TabsContent value="third-year">
            <SetupStudyProgramTable
              columns={setupStudyProgramColumns}
              data={setStudy}
            />
          </TabsContent>
          <TabsContent value="fourth-year">
            <SetupStudyProgramTable
              columns={setupStudyProgramColumns}
              data={setStudy}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
