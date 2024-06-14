// @ts-ignore

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
          <h3 className="font-semibold text-lms-primary">ADD STUDENT</h3>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex w-full justify-center items-center">
        <AddUserStudentForm />
      </section>
    </main>
  );
}
