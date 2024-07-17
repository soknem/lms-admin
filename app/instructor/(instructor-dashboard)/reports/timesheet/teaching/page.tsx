import { TeachingType} from "@/lib/types/instructor/teachingtype";
import teaching from "@/app/instructor/(instructor-dashboard)/reports/timesheet/teaching/data/teaching.json";
import { TeachingDataTable } from "@/components/instructorcomponent/reports/timesheet/teaching/data-table";
import { TeachingColumns } from "@/components/instructorcomponent/reports/timesheet/teaching/columns";

export default function Teaching() {
    const teachingData: TeachingType[] = teaching;
    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <TeachingDataTable columns={TeachingColumns} data={teachingData} />
        </main>
    );
}
