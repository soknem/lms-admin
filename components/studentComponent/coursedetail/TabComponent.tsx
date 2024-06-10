import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import CurriculumComponent from "./CurriculumComponent";
// @ts-ignore
import SlideComponent from "./SlideComponent";
// @ts-ignore
import VideoComponent from "./VideoComponent";


export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="curriculum">
        <TabsList>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="Slide">Slide</TabsTrigger>
          <TabsTrigger value="Video">Video</TabsTrigger>
          <TabsTrigger value="Mini Project">Mini Project</TabsTrigger>
        </TabsList>
        <TabsContent value="curriculum">
          <CurriculumComponent />
        </TabsContent>
        <TabsContent value="Slide">
          <SlideComponent />
        </TabsContent>
        <TabsContent value="Video">
          <VideoComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
