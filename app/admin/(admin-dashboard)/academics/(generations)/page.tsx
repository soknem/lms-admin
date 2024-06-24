'use client'
import React, {useEffect, useState} from "react";
import { GenerationType } from "@/lib/types/admin/academics";
import generaitions from "@/app/admin/(admin-dashboard)/academics/(generations)/data/generations.json"
import { columns } from "@/components/admincomponent/academics/generations/columns";
import { DataTable } from "@/components/admincomponent/academics/generations/data-table";
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";
import {AppDispatch, RootState} from "@/lib/store";
import {useDispatch, useSelector} from "react-redux";
import {
    selectGeneration,
    setGenerations
} from "@/lib/features/admin/academic-management/generation/generationSlice";

export  default  function Generation() {

    const dispatch = useDispatch<AppDispatch>();
    const { data, error, isLoading } = useGetGenerationQuery({ page: 0, pageSize: 10 });

    const generations = useSelector((state: RootState) => selectGeneration(state));


    useEffect(() => {
        if (data) {
            dispatch(setGenerations(data.content));
        }
        if (error) {
            console.error("failed to load generation", error);
        }
    }, [data, error, dispatch]);

    // console.log("generation from page: " , generations)

    const genData : GenerationType[] = generations;

    return (
        <main className='flex flex-col gap-4 h-full w-full p-9'>
            <h1 className='mb-4 text-3xl font-bold text-lms-primary '>Generation</h1>
            <DataTable columns={columns} data={genData}/>
        </main>
    )
}
