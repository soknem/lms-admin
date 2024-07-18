"use client";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Curriculum} from "@/lib/types/student/course";
import CurriculumComponent from "@/components/studentcomponent/coursedetail/CurriculumComponent";
import SlideComponent from "@/components/studentcomponent/coursedetail/SlideComponent";
import VideoComponent from "@/components/studentcomponent/coursedetail/VideoComponent";
import { useRouter } from "next/navigation";

type TabComponentProps = {
    courseTitle: string;
    courseDescription: string;
    curriculumData: Curriculum | null;
}

export default function TabComponent(
    {

                                         curriculumData,
                                         courseTitle,
                                         courseDescription
                                     }: TabComponentProps
) {

    const router = useRouter();


    return (
        <section>
            <Tabs defaultValue="curriculum">
                <section className="flex items-center justify-between">

                    <TabsList>
                        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                        <TabsTrigger value="Slide">Slide</TabsTrigger>
                        <TabsTrigger value="Video">Video</TabsTrigger>
                        <TabsTrigger value="Mini Project">Mini Project</TabsTrigger>
                    </TabsList>

                </section>


                <TabsContent value="curriculum">
                    <CurriculumComponent
                        curr={curriculumData}
                        courseTitle={courseTitle}
                        courseDescription={courseDescription}
                    />
                </TabsContent>
                <TabsContent value="Slide">
                    <SlideComponent/>
                </TabsContent>
                <TabsContent value="Video">
                    <VideoComponent/>
                </TabsContent>
            </Tabs>
        </section>
    );
}