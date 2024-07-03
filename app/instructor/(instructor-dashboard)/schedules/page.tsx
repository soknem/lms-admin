"use client";
import { scheduleColumns } from "@/components/instructorcomponent/schedules/columns";
import { ScheduleTable } from "@/components/instructorcomponent/schedules/data-table";
import React, { useEffect } from "react";
import { FaBook } from "react-icons/fa6";
import { useGetScheduleQuery } from "@/lib/features/instructor/schedule/schedule";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { selectSchedule} from "@/lib/features/instructor/schedule/scheduleSlice";
import { setSchedule} from "@/lib/features/instructor/schedule/scheduleSlice";
import {ScheduleType} from "@/lib/types/instructor/schedule";


export default function Schedule() {
  const dispatch = useDispatch<AppDispatch>();
  const {data, error, isLoading} = useGetScheduleQuery({page: 0, pageSize: 25});

  const schedules = useSelector((state: RootState) => selectSchedule(state));


  useEffect(() => {
    if (data) {
      dispatch(setSchedule(data.content));
    }
    if (error) {
      console.error("failed to load generation", error);
    }
  }, [data, error, dispatch]);



  const scheduleData: ScheduleType[] = schedules;


  return (
      <main className="flex flex-col h-full w-full p-9">
        <section className="bg-lms-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, Thida!
            </h2>
            <p className="text-lg text-slate-50">
              Passionate about literature and creative writing.
            </p>
          </div>
          <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-24">
            {/* image */}
            <div className="w-[150px] h-[150px] rounded-full shadow-lg">
              <img
                  src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
                  alt="student"
                  className="h-full w-full object-cover rounded-full"
              />
            </div>

            {/* name and course */}
            <div className="flex flex-col justify-end">
              <h3 className="text-3xl font-bold">Chan Tida</h3>
              <div className="flex items-center gap-3">
                <FaBook className="w-4 h-4 text-lms-primary" />
                <p className="text-lg text-gray-800 font-semibold">8 Course</p>
              </div>
            </div>
          </section>
        </section>

        <section className="flex lg:hidden gap-9 py-8">
          {/* image */}
          <div className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full shadow-lg">
            <img
                src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
                alt="student"
                className="h-full w-full object-cover rounded-full"
            />
          </div>

          {/* name and course */}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg lg:text-3xl font-bold">Chan Tida</h3>
            <div className="flex items-center gap-3">
              <FaBook className="w-4 h-4 text-lms-primary" />
              <p className="text-sm text-gray-800 font-semibold">8 Course</p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <ScheduleTable columns={scheduleColumns} data={scheduleData} />
        </section>
      </main>
  );
}
