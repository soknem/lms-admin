"use client"
import {admissionColumns} from "@/components/admincomponent/admissions/columns";
import {AdmissionTable} from "@/components/admincomponent/admissions/data-table";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetAdmissionsQuery} from "@/lib/features/admin/admission-management/admission";
import {selectAdmission, selectError, setAdmissions} from "@/lib/features/admin/admission-management/admissionSlice";
import {AdmissionType} from "@/lib/types/admin/admission";
import {selectLoading} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";

export default function Admissions() {
    const dispatch = useDispatch<AppDispatch>();
    const {data, error, isLoading} = useGetAdmissionsQuery({page: 0, pageSize: 10});

    const admissions = useSelector((state: RootState) => selectAdmission(state));
    const setupStuProLoading = useSelector(selectLoading);
    const setupStuProError = useSelector(selectError);

    useEffect(() => {
        if (data) {
            dispatch(setAdmissions(data.content));
        }
        if (error) {
            console.error("failed to load admission", error);
        }
    }, [data, error, dispatch]);


    return (
        <main className="flex flex-col h-full w-full p-9">
            <h2 className="text-4xl text-lms-primary font-bold">Admissions</h2>

            <AdmissionTable columns={admissionColumns} data={admissions}/>
        </main>
    );
}
