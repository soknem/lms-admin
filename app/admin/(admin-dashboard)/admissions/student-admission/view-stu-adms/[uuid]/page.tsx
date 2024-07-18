import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {ViewStudentAmsForm} from "@/components/admincomponent/admissions/student-admission/viewStudentForm";


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
                            <Link href="/admin/admissions" legacyBehavior passHref>
                                <BreadcrumbLink>STUDENT ADMISSION</BreadcrumbLink>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">VIEW</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <ViewStudentAmsForm uuid={uuid}/>
            </section>
        </main>
    );
}
