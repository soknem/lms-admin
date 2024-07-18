"use client";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { Curriculum} from "@/lib/types/student/course";
import CurriculumComponent from "@/components/studentcomponent/coursedetail/CurriculumComponent";
import SlideComponent from "@/components/studentcomponent/coursedetail/SlideComponent";
import VideoComponent from "@/components/studentcomponent/coursedetail/VideoComponent";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type TabComponentProps = {
    courseTitle: string;
    courseDescription: string;
    curriculumData: Curriculum | null;
    courseUuid: string;
}

export default function TabComponent(
    {courseUuid,
                                         curriculumData,
                                         courseTitle,
                                         courseDescription,

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

                    {/*<button onClick={*/}
                    {/*    () => router.push(`/instructor/courses/lectures/${courseUuid}`)*/}
                    {/*} className=" relative flex border border-blue-800 text-lms-primary pl-4 pr-10 justify-center rounded-lg py-1.5 font-medium text-lg  ">*/}
                    {/*    <p>Lecture</p>*/}
                    {/*    <div className=" absolute top-[11px] right-[15px]">*/}
                    {/*        <FaArrowRight />*/}
                    {/*    </div>*/}
                    {/*</button>*/}
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