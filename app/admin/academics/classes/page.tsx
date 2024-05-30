import React from 'react'
import {DataTable} from "./data-table"
import {columns} from "./columns"

async function getGenerations(): Promise<GenerationType[]> {
  const res = await fetch(
    'https://6656cd809f970b3b36c69232.mockapi.io/api/v1/generations'
  )
  const data = await res.json()
  
  console.log("data from page: ",data);
  return data
}

export default function page() {
  return (
    <section className='py-9'>
        <div className='container'>
          <h1 className='mb-6 text-3xl font-bold text-primary'>Generation</h1>
          <DataTable columns={columns} data={data} />
        </div>

       
      </section>
    
  )
}
