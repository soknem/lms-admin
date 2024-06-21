'use client'
import React, {useEffect, useState} from "react";
import {GenerationType} from "@/lib/types/admin/academics";
import generaitions from "@/app/admin/(admin-dashboard)/academics/(generations)/data/generations.json"
import {columns} from "@/components/admincomponent/academics/generations/columns";
import {DataTable} from "@/components/admincomponent/academics/generations/data-table";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculty";


import {useAppSelector} from "@/lib/hook";
import {selectToken} from "@/lib/features/auth/authSlice";

// async function getGenerations(): Promise<GenerationType[]> {
//   const res = await fetch(
//     "https://6656cd809f970b3b36c69232.mockapi.io/api/v1/generations"
//   );
//   const data = await res.json();

//   // console.log("data from page: ",data);
//   return data;
// }


export default function Generation() {
    // const data = await getGenerations()
    const token = useAppSelector(selectToken);

    console.log("token from admin: ", token)

    const {data, error, isLoading, isFetching} = useGetFacultiesQuery({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        if (data) {
            console.log('Fetched Data:', data);
        }
        if (error) {
            console.error('Error fetching faculties:', error);
        }
    }, [data, error]);

    if (isLoading) return <div>Loading...</div>;


    console.log("data from faculty api: ", data);
    console.log("error from faculty api: ", error);
    console.log("isLoading", isLoading);

    const genData: GenerationType[] = generaitions;

    return (
        <main className='flex flex-col gap-4 h-full w-full p-9'>
            <h1 className='mb-4 text-3xl font-bold text-lms-primary '>Generation</h1>
            <DataTable columns={columns} data={genData}/>
        </main>
    )
}
