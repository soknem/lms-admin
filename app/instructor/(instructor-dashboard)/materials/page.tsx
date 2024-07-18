"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetMaterialsQuery} from "@/lib/features/instructor/meterials/meterials";
import {selectMaterial, setMaterials} from "@/lib/features/instructor/meterials/intmeterialsSlice";
import {useGetAllSectionQuery} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import {selectSection, setSections} from "@/lib/features/admin/materials/subjectMaterialSection/sectionSlice";
import {SectionTable} from "@/components/instructorcomponent/materials/section/data-table";
import {sectionColumns} from "@/components/instructorcomponent/materials/section/columns";
import {MaterialTable} from "@/components/instructorcomponent/materials/data-table";
import {materialColumns} from "@/components/instructorcomponent/materials/columns";

export default function Materials() {
    const dispatch = useDispatch<AppDispatch>();

    // Fetching different types of materials
    const {data: curriculumData} = useGetMaterialsQuery({page: 0, pageSize: 10, fileType: "curriculum"});
    const {data: slideData} = useGetMaterialsQuery({page: 0, pageSize: 10, fileType: "slide"});
    const {data: videoData} = useGetMaterialsQuery({page: 0, pageSize: 10, fileType: "youtubeVideo"});

    // Selecting materials from the state
    const materials = useSelector((state: RootState) => selectMaterial(state));

    // Setting materials in the state
    useEffect(() => {
        if (curriculumData) {
            dispatch(setMaterials(curriculumData.content));
        }
    }, [curriculumData, dispatch]);

    useEffect(() => {
        if (slideData) {
            dispatch(setMaterials(slideData.content));
        }
    }, [slideData, dispatch]);

    useEffect(() => {
        if (videoData) {
            dispatch(setMaterials(videoData.content));
        }
    }, [videoData, dispatch]);

    console.log(materials);

    // Fetching sections
    const {data: sectionsData} = useGetAllSectionQuery({page: 0, pageSize: 10});
    const sections = useSelector((state: RootState) => selectSection(state));

    // Setting sections in the state
    useEffect(() => {
        if (sectionsData) {
            dispatch(setSections(sectionsData));
        }
    }, [sectionsData, dispatch]);

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
                    <MaterialTable columns={materialColumns} data={curriculumData ? curriculumData.content : []}/>
                </TabsContent>

                <TabsContent value="slide">
                    <MaterialTable columns={materialColumns} data={slideData ? slideData.content : []}/>
                </TabsContent>

                <TabsContent value="video">
                    <MaterialTable columns={materialColumns} data={videoData ? videoData.content : []}/>
                </TabsContent>
            </Tabs>
        </main>
    );
}
