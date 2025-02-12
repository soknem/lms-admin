'use client'

import React, {useEffect} from "react";
import {ClassDetailResponseType, ClassTableFormType} from "@/lib/types/admin/academics";
import { columns } from "@/components/admincomponent/academics/classes/columns";
import { DataTable } from "@/components/admincomponent/academics/classes/data-table";
import {useGetClassesQuery} from "@/lib/features/admin/academic-management/classes/classApi";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {setLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {setClasses} from "@/lib/features/admin/academic-management/classes/classSlice";
import {
  selectDetailClassCoursesByUuid,
  selectDetailClasses,
  setDetailClasses
} from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";


export default function Class() {

  const dispatch = useDispatch<AppDispatch>();

  const {data, error} = useGetClassesQuery({ page: 0, pageSize: 10 })

  const DetailClassData = useSelector((state: RootState) => selectDetailClasses(state));

  const CoursesData = useSelector((state: RootState) => selectDetailClassCoursesByUuid(state,"271cf40e-e4bc-4ec6-a587-1fd1d780867d"));

  useEffect(() => {
    if(data) {
      dispatch(setDetailClasses(data.content))
    }
    if(error){
      console.error("failed to load class", error);
    }
  }, [data, error, dispatch]);



  const transformToClassTableData = (data : any[] )   => {
    return data.map(item => ({
      uuid: item.uuid,
      year: item.year,
      classStart: item?.classStart || "N/A",
      classEnd: item?.classEnd || "N/A",
      classCode: item?.classCode || "N/A",
      shift: item?.shift?.name || "N/A",
      studyProgram: item?.studyProgram?.studyProgramName || "N/A",
      generation: item?.generation?.name || "N/A",
      isDraft: item.isDraft,
      instructor: item.instructor?.nameEn || "N/A",
      isDeleted: item.isDeleted ,
      status: item?.status || 1,
      academicYear: item?.academicYear?.academicYear || "N/A",
    }));
  };


  return (
    <main >
      <section className="flex flex-col gap-2 h-full w-full p-9">
        <h1 className=' text-3xl font-bold text-lms-primary '>Classes</h1>
        <DataTable columns={columns} data={transformToClassTableData(DetailClassData)} />
      </section>

    </main>
  );
}