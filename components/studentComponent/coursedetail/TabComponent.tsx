import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurriculumComponent from "./CurriculumComponent";
import SlideComponent from "./SlideComponent";
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
