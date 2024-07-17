'use client'
import { EditUserStuForm } from "@/components/admincomponent/users/students/EditUserStu";
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
import {EditStudentForm} from "@/components/admincomponent/users/students/EditStudentForm";
import {useGetStudentByUuidQuery} from "@/lib/features/admin/user-management/student/student";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Users(props: Props) {

  const { data: stuData, isLoading: isStuLoading, error: stuError ,isSuccess: isStudentSuccess} = useGetStudentByUuidQuery(props.params.id);

  return (
    <main className="flex flex-col p-9 gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbLink asChild>
                <Link href="/admin/users" className='font-semibold text-gray-30 uppercase'>
                  User
                </Link>
              </BreadcrumbLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <h3 className="font-semibold text-lms-primary">EDIT STUDENT</h3>
        </BreadcrumbList>
      </Breadcrumb>

      <section className=" gap-6 p-6 bg-white rounded-[10px] ">
        {isStuLoading ? (
            <p className="h-screen flex items-center justify-center">Loading...</p>
        ) : stuError ? (
            <p>Error loading student data</p>
        ) : (
            <EditStudentForm updateData={stuData} />
        )}

      </section>

    </main>
  );
}
