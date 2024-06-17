import { AddStudentAmsForm } from "@/components/admincomponent/admissions/student-admission/addStudentAmsForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export default function Users() {
    return (
        <main className="flex flex-col p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/admissions/student-admission" legacyBehavior passHref>
                                <BreadcrumbLink>STUDENT ADMISSION</BreadcrumbLink>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <h3 className="font-semibold text-lms-primary">ADD</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <AddStudentAmsForm/>
            </section>
        </main>
    );
}
