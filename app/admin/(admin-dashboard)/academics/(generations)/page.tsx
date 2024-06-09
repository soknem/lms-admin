import React from "react";

import { GenerationType } from "@/lib/types/admin/academics";
import generaitions from "@/app/admin/(admin-dashboard)/academics/(generations)/data/generations.json"
import { columns } from "@/components/admincomponent/academics/generations/columns";
import { DataTable } from "@/components/admincomponent/academics/generations/data-table";

// async function getGenerations(): Promise<GenerationType[]> {
//   const res = await fetch(
//     "https://6656cd809f970b3b36c69232.mockapi.io/api/v1/generations"
//   );
//   const data = await res.json();

//   // console.log("data from page: ",data);
//   return data;
// }


export  default  function page() {
    // const data = await getGenerations()

    const genData : GenerationType[] = generaitions;
    
    return (
      <main className='py-9'>
        <div className='container'>
          <h1 className='mb-4 text-3xl font-bold text-lms-primary '>Generation</h1>
          <DataTable columns={columns} data={genData} />
        </div>
      </main>
    )
}
