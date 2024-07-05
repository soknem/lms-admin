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
      console.log("class from page : ",data.content)
      dispatch(setDetailClasses(data.content))
    }
    if(error){
      console.error("failed to load class", error);
    }
  }, [data, error, dispatch]);

  console.log("detail class from class page: ", DetailClassData)

  console.log("detail class course page: ",CoursesData)

  const transformToClassTableData = (data : any[] )   => {
    return data.map(item => ({
      uuid: item.uuid,
      classCode: item.classCode,
      shift: item.shift.name,
      studyProgram: item.studyProgram.studyProgramName,
      generation: item.generation.name,
      isDraft: item.isDraft,
      isDeleted: item.isDeleted,
      status: item.status
    }));
  };

  console.log("transformToClassTableData", transformToClassTableData(DetailClassData));

  return (
    <main >
      <section className="flex flex-col gap-2 h-full w-full p-9">
        <h1 className=' text-3xl font-bold text-lms-primary '>Classes</h1>
        <DataTable columns={columns} data={transformToClassTableData(DetailClassData)} />
      </section>

    </main>
  );
}