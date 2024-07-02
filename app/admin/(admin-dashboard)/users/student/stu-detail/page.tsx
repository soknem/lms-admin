import MoreInfo from "@/components/admincomponent/users/students/StuMoreInfo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import { PiCertificateFill } from "react-icons/pi";

export default function Users() {



  return (
    <main className="flex flex-col h-full p-9 gap-6">
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
          <h3 className="font-semibold text-lms-primary">DETAIL</h3>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex flex-grow  gap-6 p-6">
        <div className="h-[557px] w-[404px] bg-white p-6 flex flex-col items-center rounded-[10px] gap-9 ">
          <div className="h-[356px] w-[352px] rounded-[10px]">
            <img
              src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
              alt="banner"
              className="h-full w-full rounded-[10px] object-cover"
            />
          </div>

          <div className="flex flex-col items-start w-full gap-4">
            <p className="font-bold text-4xl">Noun Sovanthorn</p>
            <p className="khmer-font text-lms-gray-30 text-xl">នួន សុវណ្ណថន</p>
          </div>
        </div>

        <div className="h-[557px] w-full bg-white p-6 flex flex-col  rounded-[10px] gap-9 relative">
          <div className="absolute top-6 right-6">
            <MoreInfo />
          </div>

          <p className="font-bold text-4xl">Personal Information</p>

          <div className="flex flex-col space-y-2 ml-4">
            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Gender</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl">Female</p>
            </div>

            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Date Of Birth</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl">12-05-2002</p>
            </div>

            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Personal Number</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl">099456723</p>
            </div>

            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Family Number</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl">099456723</p>
            </div>

            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Biography</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl w-4/5">
                Satisfied conveying a dependent contented he gentleman agreeable
                do be. Warrant private blushes removed an in equally totally if.
                Delivered dejection necessary objection do Mr prevailed. Mr
                feeling does chiefly cordial in do.
              </p>
            </div>

            <div className="flex w-[90%]">
              <p className="text-xl text-lms-gray-30 w-1/6">Email</p>
              <p className="text-xl text-lms-gray-30 mr-6">:</p>
              <p className="text-xl w-2/3">NounSovanthorn@istad.com</p>
            </div>
          </div>

          <div className="flex flex-col items-start w-full gap-2 ml-4">
            <p className="font-bold text-2xl">Documents</p>

            <div className="flex justify-start w-full gap-16">
              <div className="flex items-center gap-3">
                <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
                <p className="font-medium text-xl">Certificate</p>
              </div>
              <div className="flex items-center gap-3">
                <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
                <p className="font-medium text-xl">Certificate</p>
              </div>
              <div className="flex items-center gap-3">
                <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
                <p className="font-medium text-xl">Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
