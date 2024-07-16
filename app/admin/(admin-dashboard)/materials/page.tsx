"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetMaterialsQuery} from "@/lib/features/admin/materials/material";
import {selectMaterial, setMaterials} from "@/lib/features/admin/materials/materialsSlice";
import {MaterialTable} from "@/components/admincomponent/materials/data-table";
import {materialColumns} from "@/components/admincomponent/materials/columns";
import {useGetAllSectionQuery} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import {selectSection, setSections} from "@/lib/features/admin/materials/subjectMaterialSection/sectionSlice";
import {SectionTable} from "@/components/admincomponent/materials/section/data-table";
import {sectionColumns} from "@/components/admincomponent/materials/section/columns";


export default function Materials() {
    const dispatch = useDispatch<AppDispatch>();

    // Materials
    const {
        data: materialsData,
    } = useGetMaterialsQuery({page: 0, pageSize: 10});
    const materials = useSelector((state: RootState) => selectMaterial(state));

    useEffect(() => {
        if (materialsData) {
            dispatch(setMaterials(materialsData.content));
        }
    }, [materialsData, dispatch]);

    console.log("Materials", materialsData.content)


    // Section of materials in each subject
    const {
        data: sectionsData,
    } = useGetAllSectionQuery({page: 0, pageSize: 10});


    // Don't need arguement
    // const {
    //     data: sectionsData,
    // } = useGetAllSectionQuery();

    const sections = useSelector((state: RootState) => selectSection(state));

    useEffect(() => {
        if (sectionsData) {
            dispatch(setSections(sectionsData));
        }
    }, [sectionsData, dispatch]);

    // console.log("Sections", sectionsData)

    const [currentFiletype, setCurrentYear] = useState("");

    const filterDataByFileType = (filetype: string) => {
        return materials.filter((item: any) => item.fileType === filetype);
    };


    return (
        <main className="flex flex-col h-full w-full p-9">
            <h2 className="mb-6 text-4xl text-lms-primary font-bold">Materials</h2>
            <Tabs defaultValue="sections" className="w-full">
                <TabsList>
                    <TabsTrigger value="sections">Section</TabsTrigger>
                    <TabsTrigger value="curriculums">Curriculum</TabsTrigger>
                    <TabsTrigger value="slide">Slide</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>

                <TabsContent value="sections">
                    <SectionTable columns={sectionColumns} data={sections}/>
                </TabsContent>

                <TabsContent value="curriculums">
                    <MaterialTable columns={materialColumns} data={filterDataByFileType("curriculum")}/>
                </TabsContent>

                <TabsContent value="slide">
                    <MaterialTable columns={materialColumns} data={filterDataByFileType("slide")}/>
                </TabsContent>

                <TabsContent value="video">
                    <MaterialTable columns={materialColumns} data={filterDataByFileType("youtubeVideo")}/>
                </TabsContent>
            </Tabs>
        </main>
    );
}
