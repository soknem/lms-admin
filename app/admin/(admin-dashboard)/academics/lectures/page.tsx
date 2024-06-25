'use client'
import React, {useEffect} from "react";
import {lectureRespondType, LectureType} from "@/lib/types/admin/academics";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json"
import { LectureDataTable } from "@/components/admincomponent/academics/lectures/LectureDataTable";
import { LectureColumns } from "@/components/admincomponent/academics/lectures/LectureColumns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetAssessmentQuery} from "@/lib/features/admin/academic-management/assesment/assessment";
import {useGetLectureQuery} from "@/lib/features/admin/academic-management/lecture/lecture";
import {selectLecture, setLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {setAssessment} from "@/lib/features/admin/academic-management/assesment/assessmentSlice";

export default  function Lecture() {
  // const Lecturedata: LectureType[] = lectures;

  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useGetLectureQuery({ page: 0, pageSize: 10 });

  const LectureData = useSelector((state: RootState) => selectLecture(state));

  useEffect(() => {
    if(data) {
      dispatch(setLecture(data.content))
    }
    if(error){
      console.error("failed to load lecture", error);
    }
  }, [data, error, dispatch]);

  // console.log("lecture data: ", LectureData[0].startTime);

  // Define the transformation function
  const transformData = (data : lectureRespondType[]) : LectureType[] => {
    return data.map(item  => ({
      uuid: item.uuid,
      session: `${item.startTime}-${item.endTime}`,
      lectureDate: item.lectureDate,
      isDeleted: item.isDeleted,
      isDraft: item.isDraft,
      status: item.status,
      teachingType: item.teachingType,
      classCode: item.classCode,
      courseTitle: item.course ? item.course.title : 'N/A',
      courseUuid: item.course ? item.course.uuid : 'N/A',
      instructorName: item.course && item.course.instructor ? item.course.instructor.nameEn : 'N/A',
      instructorUuid: item.course && item.course.instructor ? item.course.instructor.uuid : 'N/A'
    }));
  };

  const LecData : LectureType[] = transformData(LectureData)

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
    <h1 className=' text-3xl font-bold text-lms-primary'>Lectures</h1>
      {/*need transform data */}
      <LectureDataTable columns={LectureColumns} data={LecData} />
  </section>
  );
}