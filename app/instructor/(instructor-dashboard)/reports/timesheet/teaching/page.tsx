'use client'
import { TeachingType} from "@/lib/types/instructor/teachingtype";
import teaching from "@/app/instructor/(instructor-dashboard)/reports/timesheet/teaching/data/teaching.json";
import { TeachingDataTable } from "@/components/instructorcomponent/reports/timesheet/teaching/data-table";
import { TeachingColumns } from "@/components/instructorcomponent/reports/timesheet/teaching/columns";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useEffect} from "react";
import {useGetTeachingQuery} from "@/lib/features/instructor/report/timesheet/techingHistory/teaching";
import {selectTeachings, setTeachings} from "@/lib/features/instructor/report/timesheet/techingHistory/teachingSlice";

export default function Teaching() {
    const dispatch = useDispatch();
    const { data, error } = useGetTeachingQuery();


    const teachingData: TeachingType[] = useSelector((state: RootState) => selectTeachings(state));

    // Effect to update Redux store on data change
    useEffect(() => {
        if (data ) {
            dispatch(setTeachings(data.content));

        }
        if (error) {
            console.error("Failed to load teaching", error);
        }
    }, [data, error, dispatch]);


  return (
    <main className="flex flex-col gap-4 h-full w-full p-9">
      <TeachingDataTable columns={TeachingColumns} data={teachingData} />
    </main>
  );
}
