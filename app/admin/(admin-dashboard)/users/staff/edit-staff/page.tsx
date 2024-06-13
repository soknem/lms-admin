// @ts-ignore
import StudyDetailtTable from "@/components/adminComponent/faculties/studygrogram/studyprogram-detail/studydetail";
// @ts-ignore
import { EditUserStuForm } from "@/components/adminComponent/users/students/EditUserStu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCamera } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { PiCertificateFill } from "react-icons/pi";
import {EditUserStaffForm} from "@/components/adminComponent/users/staff/EditUserStaffForm";


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
