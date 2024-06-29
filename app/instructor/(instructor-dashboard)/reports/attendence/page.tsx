import React from "react";

import {AttendanceTableType, AttendanceType} from "@/lib/types/instructor/report";
import attendence from "@/app/instructor/(instructor-dashboard)/reports/attendence/data/attentdent.json";
import { AttendanceData } from "@/components/instructorcomponent/reports/attendence/AttentdentData";
import { attentdentColumns } from "@/components/instructorcomponent/reports/attendence/AttentdentColumns";


export default function Attentdence() {
  const data: AttendanceType[] = attendence;
  //  const { data, error, isLoading } = useGetAttendanceQuery({ page: 0, pageSize: 25 });

  return (
    <section className="flex flex-col gap-4 h-full w-full p-9">
      <h1 className=" text-3xl font-bold text-lms-primary">Attendence</h1>
      <AttendanceData columns={attentdentColumns} data={data} />
    </section>
  );
}
