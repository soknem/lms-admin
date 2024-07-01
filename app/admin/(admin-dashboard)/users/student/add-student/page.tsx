import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {AddUserStudentForm} from "@/components/admincomponent/users/students/addStudentForm";

export default function Users() {
    return (
        <main className="flex flex-col p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/users" legacyBehavior passHref>
                                <BreadcrumbLink>STUDENT</BreadcrumbLink>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">ADD STUDENT</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <AddUserStudentForm/>
            </section>
        </main>
    );
}
