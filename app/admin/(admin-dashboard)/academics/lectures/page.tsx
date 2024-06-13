import React from "react";


import { LectureType } from "@/lib/types/admin/academics";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json"
import {LectureDataTable} from "@/components/adminComponent/academics/lectures/LectureDataTable";
import {LectureColumns} from "@/components/adminComponent/academics/lectures/LectureColumns";

export default  function Lecture() {
  const data: LectureType[] = lectures;

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
    <h1 className=' text-3xl font-bold text-lms-primary'>Lectures</h1>
      <LectureDataTable columns={LectureColumns} data={data} />
  </section>
  );
}