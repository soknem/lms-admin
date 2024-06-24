"use client"

import {curriculumColumns} from "@/components/admincomponent/materials/curriculum/columns";
import {slideColumns} from "@/components/admincomponent/materials/slide/columns";
import curriculum from "@/components/admincomponent/materials/curriculum/curriculum.json"
import {videoColumns} from "@/components/admincomponent/materials/video/columns";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {getSlide, getVideo} from "@/lib/endpoints/MokApi";
import React, {useEffect, useState} from "react";
import {VideoTable} from "@/components/admincomponent/materials/video/data-table";
import {CurriculumType} from "@/lib/types/admin/materials";
import {CurriculumTable} from "@/components/admincomponent/materials/curriculum/data-table";
import {SlideTable} from "@/components/admincomponent/materials/slide/data-table";
import {useAppSelector} from "@/lib/hook";
import {selectToken} from "@/lib/features/auth/authSlice";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useGetSlidesMutation} from "@/lib/features/admin/materials/material";

export default async function Materials() {
    const token = useAppSelector(selectToken);

    // console.log("token from admin: ", token)

    // Define state for filters and API call response

    // const curData: CurriculumType[] = curriculum;


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
                    <CurriculumTable columns={curriculumColumns} data={slideData}/>

                </TabsContent>
                <TabsContent value="slide">
                    {/*<SlideTable columns={slideColumns} data={slideData}/>*/}
                </TabsContent>
                <TabsContent value="video">
                    {/*<VideoTable columns={videoColumns} data={videoData}/>*/}
                </TabsContent>
            </Tabs>
        </main>
    );
}

