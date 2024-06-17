import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {EditUserStaffForm} from "@/components/admincomponent/users/staff/EditUserStaffForm";


export default function Users() {
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
                    <BreadcrumbSeparator />
                    <h3 className="font-semibold text-lms-primary">EDIT STAFF</h3>
                </BreadcrumbList>
            </Breadcrumb>

            <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
                <EditUserStaffForm />
            </section>

            <section>

            </section>

        </main>
    );
}
