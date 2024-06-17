'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import AddStaffForm from "@/components/admincomponent/users/staff/AddStaffForm";

export default function AddStaff(){
    return (
        <main className="flex flex-col p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/users" legacyBehavior passHref>
                                <BreadcrumbLink>STAFF</BreadcrumbLink>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">ADD STAFF</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <AddStaffForm/>
            </section>
        </main>
    )
}
