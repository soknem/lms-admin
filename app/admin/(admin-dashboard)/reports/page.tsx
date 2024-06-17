import { LectureType } from "@/lib/types/admin/academics";
import React from "react";
import lectures from "@/app/admin/(admin-dashboard)/academics/lectures/data/lectures.json";
import { FilterAdmin } from "@/components/admincomponent/reports/Filter";
import { LectureColumns } from "@/components/admincomponent/academics/lectures/LectureColumns";
import TabComponent from "@/components/admincomponent/reports/TabComponent";
import ConfirmationModal from "@/components/card/staff/CardDisableComponent";

export default async function Report() {
  const data: LectureType[] = lectures;
  return (
    <main className="p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Reports</h2>
      <div>
        <div className="flex justify-end">
          <FilterAdmin columns={LectureColumns} data={data} />
        </div>
        <div className="mb-4">
          <TabComponent />
        </div>

      </div>
    </main>
  );
}
