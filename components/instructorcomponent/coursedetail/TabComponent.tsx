'use client'
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";

import {TbArrowNarrowRight} from "react-icons/tb";
import {useRouter} from "next/navigation";
import CurriculumComponent from "@/components/studentcomponent/coursedetail/CurriculumComponent";
import SlideComponent from "@/components/studentcomponent/coursedetail/SlideComponent";
import VideoComponent from "@/components/studentcomponent/coursedetail/VideoComponent";


export default function TabComponent() {
  const router = useRouter();
  return (
      <div>
        <Tabs defaultValue="curriculum">
          <div className="flex items-center justify-between " >
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
// onClick={() => router.push(`/instructor/courses/coursedetail/lectures`)}
