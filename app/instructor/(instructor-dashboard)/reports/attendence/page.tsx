import React from "react";

import {AttentType} from "@/lib/types/instructor/report";
import attendence from "@/app/instructor/(instructor-dashboard)/reports/attendence/data/attentdent.json";
import {AttentdentData} from "@/components/instructorcomponent/reports/attendence/AttentdentData";
import {attentdentColumns} from "@/components/instructorcomponent/reports/attendence/AttentdentColumns";


export default function Attentdence() {
    const data: AttentType[] = attendence;
    //   const { data, error, isLoading } = useGetAttendanceQuery({ page: 0, pageSize: 10 });

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <h1 className=" text-3xl font-bold text-lms-primary">Attendence</h1>
            <AttentdentData columns={attentdentColumns} data={data}/>
        </section>
    );
}
