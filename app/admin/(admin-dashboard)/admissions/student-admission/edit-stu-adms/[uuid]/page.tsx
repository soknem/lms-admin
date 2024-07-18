import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {EditStudentAmsForm} from "@/components/admincomponent/admissions/student-admission/editStudentForm";


type PropsParams = {
    params: {
        uuid: string;
    };
};
export default function Users(props: PropsParams) {
    const uuid = props.params.uuid;
    return (
        <main className="flex flex-col p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/admissions/" legacyBehavior passHref>
                                <BreadcrumbLink>STUDENT ADMISSION</BreadcrumbLink>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">EDIT</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <EditStudentAmsForm uuid={uuid}/>
            </section>
        </main>
    );
}

// "use client"
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import Link from "next/link";
// import React, {useEffect, useState} from "react";
// import {EditStudentAmsForm} from "@/components/admincomponent/admissions/student-admission/editStudentForm";
// import {useDispatch} from "react-redux";
// import {AppDispatch} from "@/lib/store";
// import {
//     useGetAllStudentAdmissionByAdmissionUuidQuery,
// } from "@/lib/features/admin/admission-management/students-admission-management/stuAdmission";
// import {
//     setStuAdmissions
// } from "@/lib/features/admin/admission-management/students-admission-management/stuAdmissionSlice";
//
// type PropsParams = {
//     params: {
//         uuid: string;
//     };
// };
//
// export default function Users(props: PropsParams) {
//     const [stuAdmsUuid, setStuAdmsUuid] = useState<string | null>(null);
//     const uuid = props.params.uuid;
//
//     const dispatch = useDispatch<AppDispatch>();
//     const {data, error, isLoading} = useGetAllStudentAdmissionByAdmissionUuidQuery(uuid);
//
//     useEffect(() => {
//         if (data) {
//             dispatch(setStuAdmissions(data.content));
//             if (data.content && data.content.uuid) {
//                 setStuAdmsUuid(data.content.uuid);
//             }
//         }
//         if (error) {
//             console.error("Failed to load student admission", error);
//         }
//     }, [data, error, dispatch]);
//
//     return (
//         <main className="flex flex-col p-9 gap-6">
//             <Breadcrumb>
//                 <BreadcrumbList>
//                     <BreadcrumbItem>
//                         {stuAdmsUuid && (
//                             <BreadcrumbLink>
//                                 <Link href={`/admin/admissions/student-admission/${stuAdmsUuid}`} legacyBehavior
//                                       passHref>
//                                     <a>STUDENT ADMISSION</a>
//                                 </Link>
//                             </BreadcrumbLink>
//                         )}
//                     </BreadcrumbItem>
//                     <BreadcrumbSeparator/>
//                     <h3 className="font-semibold text-lms-primary">EDIT</h3>
//                 </BreadcrumbList>
//             </Breadcrumb>
//             <section className="flex w-full justify-center items-center">
//                 <EditStudentAmsForm uuid={uuid}/>
//             </section>
//         </main>
//     );
// }