import React from "react";

//import component
import { LectureDataTable } from "@/components/adminComponent/academics/lectures/LectureDataTable";
import { LectureColumns } from "@/components/adminComponent/academics/lectures/LectureColumns";


//import type
import { LectureType } from "@/lib/types/admin/academics";
import lectures from "./lectures.json"

export default  function Lecture() {
  const data: LectureType[] = lectures;

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
    <h1 className=' text-3xl font-bold text-primary'>Lectures</h1>
      <LectureDataTable columns={LectureColumns} data={data} />
  </section>
  );
}