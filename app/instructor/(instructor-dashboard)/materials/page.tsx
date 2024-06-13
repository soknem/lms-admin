


import curriculum from "@/components/admincomponent/materials/curriculum/curriculum.json"
// @ts-ignore
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  getSlide, getVideo } from "@/lib/endpoints/MokApi";
import React from "react";

import {CurriculumType} from "@/lib/types/admin/materials";
// @ts-ignore
import { CurriculumTable } from "@/components/instructorComponent/materials/curriculum/data-table";
// @ts-ignore
import { curriculumColumns } from "@/components/instructorComponent/materials/curriculum/columns";
// @ts-ignore
import { SlideTable } from "@/components/instructorComponent/materials/slide/data-table";
// @ts-ignore
import { slideColumns } from "@/components/instructorComponent/materials/slide/columns";
// @ts-ignore
import { VideoTable } from "@/components/instructorComponent/materials/video/data-table";
// @ts-ignore
import { videoColumns } from "@/components/instructorComponent/materials/video/columns";


export default async function Materials() {
  const curData : CurriculumType[] = curriculum;

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
          <SlideTable columns={slideColumns} data={slideData} />
        </TabsContent>
        <TabsContent value="video">
          <VideoTable columns={videoColumns} data={videoData} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
