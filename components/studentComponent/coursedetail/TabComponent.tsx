'use client'
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import CurriculumComponent from "./CurriculumComponent";
// @ts-ignore
import SlideComponent from "./SlideComponent";
// @ts-ignore
import VideoComponent from "./VideoComponent";
import {Button} from "@/components/ui/button";

import {TbArrowNarrowRight} from "react-icons/tb";
import {useRouter} from "next/navigation";


export default function TabComponent() {
  const router = useRouter();
  return (
    <div>
      <Tabs defaultValue="curriculum">
        <div className="flex items-center justify-between " onClick={() => router.push(`/instructor/courses/coursedetail/lectures`)}>
          <TabsList>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="Slide">Slide</TabsTrigger>
            <TabsTrigger value="Video">Video</TabsTrigger>
            <TabsTrigger value="Mini Project">Mini Project</TabsTrigger>
          </TabsList>
          <Button className="border-2 bg-white flex items-center hover:bg-white/80">
            Lecture
            <TbArrowNarrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>

          <TabsContent value="curriculum">
            <CurriculumComponent/>
          </TabsContent>
          <TabsContent value="Slide">
            <SlideComponent/>
          </TabsContent>
          <TabsContent value="Video">
            <VideoComponent/>
          </TabsContent>
      </Tabs>
    </div>
);
}
