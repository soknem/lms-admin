
import { curriculumColumns } from "@/components/adminComponent/materials/curriculum/columns";
import { CurriculumTable } from "@/components/adminComponent/materials/curriculum/data-table";
import { slideColumns } from "@/components/adminComponent/materials/slide/columns";
import { videoColumns } from "@/components/adminComponent/materials/video/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurriculum, getSlide, getVideo } from "@/lib/endpoints/MokApi";
import React from "react";

export default async function Materials() {
  const curData = await getCurriculum();
  const slideData = await getSlide();
  const videoData = await getVideo();
  return (
    <main className="flex flex-col h-full w-full p-9">
      <h2 className="mb-6 text-4xl text-lms-primary font-bold">Materials</h2>
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="slide">Slide</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="curriculum">
          <CurriculumTable columns={curriculumColumns} data={curData} />
        </TabsContent>
        <TabsContent value="slide">
          <CurriculumTable columns={slideColumns} data={slideData} />
        </TabsContent>
        <TabsContent value="video">
          <CurriculumTable columns={videoColumns} data={videoData} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
