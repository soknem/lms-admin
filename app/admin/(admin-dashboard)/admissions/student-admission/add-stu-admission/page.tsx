// @ts-ignore
import StudyDetailtTable from "@/components/admincomponent/faculties/studygrogram/studyprogram-detail/studydetail";
import { EditUserStuForm } from "@/components/admincomponent/users/students/EditUserStu";
import MoreInfo from "@/components/admincomponent/users/students/StuMoreInfo";
import { AddUserStudentForm } from "@/components/admincomponent/users/students/addStudentForm";
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
import {AddStudentAmsForm} from "@/components/admincomponent/admissions/student-admission/addStudentAmsForm";

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
