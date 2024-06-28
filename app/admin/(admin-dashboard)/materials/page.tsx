"use client"

import {curriculumColumns} from "@/components/admincomponent/materials/curriculum/columns";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useCallback, useEffect, useState} from "react";
import {CurriculumTable} from "@/components/admincomponent/materials/curriculum/data-table";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {addOrUpdateFilter, removeFilter} from "@/lib/features/filters/filterSlice";
import {useFilterFilesMutation} from "@/lib/features/admin/materials/material";
import {slideColumns} from "@/components/admincomponent/materials/slide/columns";
import {SlideTable} from "@/components/admincomponent/materials/slide/data-table";


export default function Materials() {

    const dispatch = useDispatch();
    const curriculumFilterState = useSelector((state: RootState) => state.filter.curriculums);
    const slideFilterState = useSelector((state: RootState) => state.filter.slides);
    const videoFilterState = useSelector((state: RootState) => state.filter.videos);
    const [filterCurriculums] = useFilterFilesMutation();
    const [filterSlides] = useFilterFilesMutation();
    const [filterVideos] = useFilterFilesMutation();
    const [curriculumData, setCurriculumData] = useState({content: []});
    const [slideDate, setSlideData] = useState({content: []});
    const [videoData, setVideoData] = useState({content: []});


    const applyFilterCurriculum = useCallback(async () => {
        const {globalOperator, specsDto} = curriculumFilterState;
        const body = {globalOperator, specsDto};

        try {
            const curriculumData = await filterCurriculums({pageNumber: 0, pageSize: 25, body}).unwrap();
            setCurriculumData(curriculumData);
            console.log(body)
        } catch (err) {
            console.error('Failed to filter courses from API:', err);
        }

        const value = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        dispatch(addOrUpdateFilter({
            filterType: 'curriculum',
            filter: {column: 'contentType', value, operation: 'EQUAL', joinTable: null}
        }));
        console.log("Curriculum", value)

    }, [curriculumFilterState, filterCurriculums]);

    useEffect(() => {
        applyFilterCurriculum();
    }, [applyFilterCurriculum]);

    const handleCurriculumChange = useCallback(() => {
        const value = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        dispatch(addOrUpdateFilter({
            filterType: 'curriculums',
            filter: {column: 'contentType', value, operation: 'EQUAL', joinTable: null}
        }));
        console.log("Curriculum", value)
    }, [dispatch]);

    useEffect(() => {
        handleCurriculumChange();
    }, []);


    const applyFilter = useCallback(async () => {
        const {globalOperator, specsDto} = slideFilterState;
        const body = {globalOperator, specsDto};

        try {
            const slideDate = await filterSlides({pageNumber: 0, pageSize: 25, body}).unwrap();
            setSlideData(slideDate);
            console.log("slides", body)
        } catch (err) {
            console.error('Failed to filter courses from API:', err);
        }
    }, [slideFilterState, filterSlides]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handleChange = useCallback(() => {
        const value = "application/pdf";
        dispatch(addOrUpdateFilter({
            filterType: 'slides',
            filter: {column: 'contentType', value, operation: 'EQUAL', joinTable: null}
        }));
    }, [dispatch]);

    useEffect(() => {
        handleChange();
    }, []);


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
                    <CurriculumTable columns={curriculumColumns} data={curriculumData.content}/>

                </TabsContent>
                <TabsContent value="slide">
                    <SlideTable columns={slideColumns} data={slideDate.content}/>
                </TabsContent>
                <TabsContent value="video">
                    {/*<VideoTable columns={videoColumns} data={videoData}/>*/}
                </TabsContent>
            </Tabs>
        </main>
    );
}

