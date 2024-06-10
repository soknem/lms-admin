import React from "react";
import { ClassType } from "@/lib/types/admin/academics";
import { columns } from "@/components/adminComponent/academics/classes/columns";
import { DataTable } from "@/components/adminComponent/academics/classes/data-table";


async function getClasses(): Promise<ClassType[]> {
  const res = await fetch(
    'https://6656cd809f970b3b36c69232.mockapi.io/api/v1/classes'
  )
  const data = await res.json()

  // console.log("data from page: ",data);
  return data
}

export default async function Class() {
  const data = await getClasses()

  return (
    <main >
      <section className="flex flex-col gap-2 h-full w-full p-9">
        <h1 className=' text-3xl font-bold text-lms-primary '>Class</h1>
        <DataTable columns={columns} data={data} />
      </section>

    </main>
  );
}