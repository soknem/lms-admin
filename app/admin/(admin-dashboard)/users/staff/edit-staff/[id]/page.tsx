'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {EditStaffForm} from "@/components/admincomponent/users/staff/EditStaffForm";
import {useGetStaffByUuidQuery} from "@/lib/features/admin/user-management/staff/staff";
import {useGetInsDetailByUuidQuery} from "@/lib/features/admin/user-management/instructor/instructor";

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function Users(props: Props) {

    const { data : staffData , error : staffError,isSuccess: isStaffSuccess ,isLoading: isStaffLoading} = useGetStaffByUuidQuery(props.params.id)

    console.log("staff Data: ",staffData?.position || "Instructor");

    const { data : insData , error : insError,isSuccess: isInsSuccess ,isLoading: isInsLoading} = useGetInsDetailByUuidQuery(props.params.id)


    if(isStaffLoading){
        return <div className="flex justify-center items-center min-h-screen">
            Loading...
        </div>
    }

    const data = staffData?.position === "INSTRUCTOR" ? insData : staffData;

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

            <section className="gap-6 p-6 bg-white rounded-[10px]">
                <EditStaffForm uuid={props.params.id} updateData={data} />
            </section>

            <section>

            </section>

        </main>
    );
}
