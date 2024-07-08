'use client'
import curriculum from "@/components/admincomponent/materials/curriculum/curriculum.json"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSlide, getVideo } from "@/lib/endpoints/MokApi";
import React, {useEffect, useState} from "react";

import {CurriculumType} from "@/lib/types/admin/materials";
import { CurriculumTable } from "@/components/instructorcomponent/materials/curriculum/data-table";
import { curriculumColumns } from "@/components/instructorcomponent/materials/curriculum/columns";
import { SlideTable } from "@/components/instructorcomponent/materials/slide/data-table";
import { slideColumns } from "@/components/instructorcomponent/materials/slide/columns";
import { VideoTable } from "@/components/instructorcomponent/materials/video/data-table";
import { videoColumns } from "@/components/instructorcomponent/materials/video/columns";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useFilterFilesMutation} from "@/lib/features/instructor/meterials/meterials";
import {addOrUpdateFilter} from "@/lib/features/filters/filterSlice";


export default function Materials() {

  const dispatch = useDispatch();
  const curriculumFilterState = useSelector((state: RootState) => state.filter.curriculums);
  const slideFilterState = useSelector((state: RootState) => state.filter.slides);
  const videoFilterState = useSelector((state: RootState) => state.filter.videos);
  const [filterCurriculums] = useFilterFilesMutation();
  const [filterSlides] = useFilterFilesMutation();
  const [filterVideos] = useFilterFilesMutation();
  const [curriculumData, setCurriculumData] = useState({content: []});
  const [slideData, setSlideData] = useState({content: []});
  const [videoData, setVideoData] = useState({content: []});
  const [activeTab, setActiveTab] = useState('curriculums');


  //get curriculum
  // Function to apply the filter and fetch data
  const applyFilterCurriculums = async () => {
    const { globalOperator, specsDto } = curriculumFilterState;
    const body = { globalOperator, specsDto };

    try {
      const curriculumData = await filterCurriculums({ pageNumber: 0, pageSize: 25, body }).unwrap();
      setCurriculumData(curriculumData);
      console.log("curriculum body= ",body);
    } catch (err) {
      console.error('Failed to filter curriculum from API:', err);
    }
  };

  // Update the filter state when the component mounts
  useEffect(() => {
    const value = "application/pdf";
    dispatch(addOrUpdateFilter({
      filterType: 'curriculums',
      filter: { column: 'contentType', value, operation: 'EQUAL', joinTable: null }
    }));
  }, [dispatch]);

  // Apply the filter when the filter state changes
  useEffect(() => {
    if (curriculumFilterState.specsDto.length > 0) {
      applyFilterCurriculums();
    }
  }, [curriculumFilterState]);



  //get slide
  // Function to apply the filter and fetch data
  const applyFilterSlide = async () => {
    const { globalOperator, specsDto } = slideFilterState;
    const body = { globalOperator, specsDto };

    try {
      const slideData = await filterSlides({ pageNumber: 0, pageSize: 25, body }).unwrap();
      setSlideData(slideData)
      console.log("slide body = ",body);
    } catch (err) {
      console.error('Failed to filter slide from API:', err);
    }
  };

  // Update the filter state when the component mounts
  useEffect(() => {
    const value = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    dispatch(addOrUpdateFilter({
      filterType: 'slides',
      filter: { column: 'contentType', value, operation: 'EQUAL', joinTable: null }
    }));
  }, [dispatch]);

  // Apply the filter when the filter state changes
  useEffect(() => {
    if (slideFilterState.specsDto.length > 0) {
      applyFilterSlide();
    }
  }, [slideFilterState]);


  //get video
  // Function to apply the filter and fetch data
  const applyFilterVideo = async () => {
    const { globalOperator, specsDto } = videoFilterState;
    const body = { globalOperator, specsDto };

    try {
      const videoData = await filterVideos({ pageNumber: 0, pageSize: 25, body }).unwrap();
      setVideoData(videoData);
      console.log("video body= ",body);
    } catch (err) {
      console.error('Failed to filter video from API:', err);
    }
  };

  // Update the filter state when the component mounts
  useEffect(() => {
    const value = "video/mp4";
    dispatch(addOrUpdateFilter({
      filterType: 'videos',
      filter: { column: 'contentType', value, operation: 'EQUAL', joinTable: null }
    }));
  }, [dispatch]);

  // Apply the filter when the filter state changes
  useEffect(() => {
    if (videoFilterState.specsDto.length > 0) {
      applyFilterVideo();
    }
  }, [videoFilterState]);

  return (
      <main className="flex flex-col h-full w-full p-9">
        <h2 className="mb-6 text-4xl text-lms-primary font-bold">Materials</h2>
        <Tabs defaultValue="curriculums" className="w-full">
          <TabsList>
            <TabsTrigger value="curriculums">Curriculum</TabsTrigger>
            <TabsTrigger value="slide">Slide</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          <TabsContent value="curriculums">
            <CurriculumTable columns={curriculumColumns} data={curriculumData.content} />
          </TabsContent>
          <TabsContent value="slide">
            <SlideTable columns={slideColumns} data={slideData.content} />
          </TabsContent>
          <TabsContent value="video">
            <VideoTable columns={videoColumns} data={videoData.content} />
          </TabsContent>
        </Tabs>
      </main>
  );
}
