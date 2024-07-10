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
          <BreadcrumbSeparator />
          <h3 className="font-semibold text-lms-primary">EDIT STUDENT</h3>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
        <EditUserStuForm />
      </section>

      <div className="flex flex-col items-start w-full gap-2 ml-4">
        <p className="font-bold text-2xl">Documents</p>

        <div className="flex justify-start w-full gap-16">
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end w-full">
        <Button className="text-sm font-bold p-4 bg-lms-primary text-white hover:bg-lms-primary rounded-[10px]">Update</Button>
      </div>
    </main>
  );
}
