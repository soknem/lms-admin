import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {CreateMaterialForm} from "@/components/admincomponent/materials/addMaterialForm";
export default function Setting() {
    return (
        <main className="flex flex-col h-full w-full gap-9 p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/materials" legacyBehavior>
                                <a> MATERIALS</a>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <h3 className="font-semibold text-lms-primary">ADD MATERIALS</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex w-full justify-center items-center">
                <CreateMaterialForm />
            </section>
        </main>
    );
}
