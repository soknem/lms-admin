'use client';
import { scheduleColumns } from "@/components/instructorcomponent/schedules/columns";
import { ScheduleTable } from "@/components/instructorcomponent/schedules/data-table";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa6";
import { useGetScheduleQuery } from "@/lib/features/instructor/schedule/schedule";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { selectSchedule } from "@/lib/features/instructor/schedule/scheduleSlice";
import { setSchedule } from "@/lib/features/instructor/schedule/scheduleSlice";
import { ScheduleType, InstructorCourseType } from "@/lib/types/instructor/schedule";
import { useGetInstructorCourseQuery } from "@/lib/features/instructor/course/instructorCourse";

export default function Schedule() {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch schedule data
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: isScheduleLoading,
  } = useGetScheduleQuery({ page: 0, pageSize: 25 });

  // Fetch instructor course data
  const {
    data: instructorCourseData,
    error: instructorCourseError,
    isLoading: isInstructorCourseLoading,
  } = useGetInstructorCourseQuery();

  const [allData, setData] = useState<InstructorCourseType | null>(null);
  const schedules = useSelector((state: RootState) => selectSchedule(state));

  useEffect(() => {
    if (scheduleData) {
      dispatch(setSchedule(scheduleData.content));
    }
    if (scheduleError) {
      console.error("Failed to load schedule", scheduleError);
    }
  }, [scheduleData, scheduleError, dispatch]);

  useEffect(() => {
    if (instructorCourseData) {
      setData(instructorCourseData);
    }
    if (instructorCourseError) {
      console.error("Failed to load instructor course data", instructorCourseError);
    }
  }, [instructorCourseData, instructorCourseError]);

  return (
      <main className="flex flex-col h-full w-full p-9">
        <section className="bg-lms-primary w-full  rounded-xl relative flex items-center justify-center p-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {allData?.nameEn ?? 'Instructor'}
            </h2>
            <p className="text-lg text-slate-50">
              Passionate about literature and creative writing.
            </p>
          </div>
          <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-[60px]">
            <div className="w-[150px] h-[150px] rounded-full shadow-lg">
              <img
                  src={allData?.profileImage || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                  alt="student"
                  className="h-full w-full object-cover rounded-full"
              />
            </div>

            {/* name and course */}
            <div className="flex flex-col justify-end">
              <h3 className="text-3xl font-bold">{allData?.nameEn ?? 'Instructor'}</h3>
              <div className="flex items-center gap-3">
                <FaBook className="w-4 h-4 text-lms-primary"/>
                <p className="text-lg text-gray-800 font-semibold">{allData?.courses?.length ?? 0} Courses</p>
              </div>
            </div>
          </section>
        </section>

        <section className="flex lg:hidden gap-9 py-8">
          {/* image */}
          <div className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full shadow-lg">
            <img
                src={allData?.profileImage || "https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"}
                alt="student"
                className="h-full w-full object-cover rounded-full"
            />
          </div>

          {/* name and course */}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg lg:text-3xl font-bold">{allData?.nameEn ?? 'Instructor'}</h3>
            <div className="flex items-center gap-3">
              <FaBook className="w-4 h-4 text-lms-primary" />
              <p className="text-sm lg:text-lg text-gray-800 font-semibold">{allData?.courses?.length ?? 0} Courses</p>
            </div>
          </div>
          
        </section>

        <section className="mt-24">
          <ScheduleTable columns={scheduleColumns} data={schedules} />
        </section>
      </main>
  );
}
