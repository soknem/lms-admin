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
    selectError,
    selectGeneration,
    selectLoading, setError, setGenerations
} from "@/lib/features/admin/academic-management/generation/generationSlice";

export  default  function Generation() {

    const dispatch = useDispatch<AppDispatch>();
    const { data, error, isLoading } = useGetGenerationQuery({ page: 0, pageSize: 10 });

    const generations = useSelector((state: RootState) => selectGeneration(state));
    const loading = useSelector(selectLoading);
    const fetchError = useSelector(selectError);

    useEffect(() => {
        if (data) {
            dispatch(setGenerations(data.content));
        }
        if (error) {
            dispatch(setError(error.toString()));
        }
    }, [data, error, dispatch]);

    console.log("generation from page: " , generations)

    const genData : GenerationType[] = generations;

    return (
        <main className='flex flex-col gap-4 h-full w-full p-9'>
            <h1 className='mb-4 text-3xl font-bold text-lms-primary '>Generation</h1>
            <DataTable columns={columns} data={genData}/>
        </main>
    )
}
