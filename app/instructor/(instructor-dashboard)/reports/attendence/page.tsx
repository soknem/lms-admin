import React from "react";

//import component

//import type
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json";
// @ts-ignore
// @ts-ignore
import { AttentType } from "@/lib/types/instructor/report";
import attendence from "@/app/instructor/(instructor-dashboard)/reports/attendence/data/attentdent.json";
import { AttentdentData } from "@/components/instructorComponent/reports/attendence/AttentdentData";
import { attentdentColumns } from "@/components/instructorComponent/reports/attendence/AttentdentColumns";

export default function Attentdence() {
  const data: AttentType[] = attendence;

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
      <h1 className=" text-3xl font-bold text-lms-primary">Attendence</h1>
      <AttentdentData columns={attentdentColumns} data={data} />
    </section>
  );
}
