import React from "react";
import { GenerationType } from "@/lib/types/admin/academics";
import { DataTable } from "@/components/adminComponent/academics/generations/data-table";
import { columns } from "@/components/adminComponent/academics/generations/columns";

async function getGenerations(): Promise<GenerationType[]> {
  const res = await fetch(
    "https://6656cd809f970b3b36c69232.mockapi.io/api/v1/generations"
  );
  const data = await res.json();

  // console.log("data from page: ",data);
  return data;
}


export  default async function page() {
    const data = await getGenerations()
    
    return (
      <main className='py-9'>
        <div className='container'>
          <h1 className='mb-6 text-3xl font-bold text-lms-primary'>Generation</h1>
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    )
}
