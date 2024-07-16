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
    useGetAllStudentAdmissionByAdmissionUuidQuery,
    useGetStuAdmissionsQuery
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmission";
import {StudentAdmissionTable} from "@/components/admincomponent/admissions/student-admission/data-table";
import {StudentAdmissionColumns} from "@/components/admincomponent/admissions/student-admission/columns";
import {
    selectError, selectLoading,
    selectStuAdmission, setStuAdmissions
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmissionSlice";
import {useGetAdmissionByAliasQuery} from "@/lib/features/admin/admission-management/admission";

type PropsParams = {
    params: {
        uuid: string;
    };
};

export default function StuAdmissions(props: PropsParams) {

    console.log("props", props)

    const uuid = props.params.uuid;
    const dispatch = useDispatch<AppDispatch>();
    const {data, error, isLoading} = useGetAllStudentAdmissionByAdmissionUuidQuery(uuid);

    const {data: admissionData, isSuccess} = useGetAdmissionByAliasQuery(uuid);
    console.log("getAllStudentAdmissionByAdmissionUuid", admissionData)

    const admissionYear = admissionData?.academicYear.academicYear;
    // console.log("admissionYear", admissionYear)

    const stuAdmissions = useSelector((state: RootState) => selectStuAdmission(state));

    useEffect(() => {
        if (data) {
            dispatch(setStuAdmissions(data.content));
        }
        if (error) {
            console.error("failed to load student admission", error);
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
                    <h3 className="font-semibold text-lms-primary">{admissionYear}</h3>
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
