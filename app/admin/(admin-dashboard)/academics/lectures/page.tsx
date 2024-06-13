import React from "react";

//import component

//import type
import { LectureType } from "@/lib/types/admin/academics";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json"
// @ts-ignore
import { LectureDataTable } from "@/components/admincomponent/academics/lectures/LectureDataTable";
// @ts-ignore
import { LectureColumns } from "@/components/admincomponent/academics/lectures/LectureColumns";

export default  function Lecture() {
  const data: LectureType[] = lectures;

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
    <h1 className=' text-3xl font-bold text-lms-primary'>Lectures</h1>
      <LectureDataTable columns={LectureColumns} data={data} />
  </section>
  );
}