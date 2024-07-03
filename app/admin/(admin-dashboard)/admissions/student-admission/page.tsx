'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    useGetStuAdmissionsQuery
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmission";
import {StudentAdmissionTable} from "@/components/admincomponent/admissions/student-admission/data-table";
import {StudentAdmissionColumns} from "@/components/admincomponent/admissions/student-admission/columns";
import {
    selectError, selectLoading,
    selectStuAdmission, setStuAdmissions
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmissionSlice";


export default function StuAdmissions() {
    const dispatch = useDispatch<AppDispatch>();
    const {data, error, isLoading} = useGetStuAdmissionsQuery({page: 0, pageSize: 10});

    const stuAdmissions = useSelector((state: RootState) => selectStuAdmission(state));
    const setupStuProLoading = useSelector(selectLoading);
    const setupStuProError = useSelector(selectError);

    useEffect(() => {
        if (data) {
            dispatch(setStuAdmissions(data.content));
        }
        if (error) {
            console.error("failed to load generation", error);
        }
    }, [data, error, dispatch]);

    return (
        <main className="flex flex-col h-full w-full gap-2 p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/admissions" legacyBehavior>
                                <a>ADMISSION</a>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">2022-2023</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-4xl font-bold text-lms-primary">
                Admissions
            </h2>
            <StudentAdmissionTable
                columns={StudentAdmissionColumns}
                data={stuAdmissions}
            />
        </main>
    );
}
