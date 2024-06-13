'use client'
//system
import React from "react";
import Link from "next/link";
//image
import Image, {StaticImageData} from "next/image";
import CV from "@/public/staff/cv.png";
import IdCard from "@/public/staff/idcard.png";
import CourseLogo from "@/public/logocourse.png";
// icon
import { ImLinkedin, ImGithub } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";
import { BiSolidBookOpen } from "react-icons/bi";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
//components
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
// @ts-ignore
import MoreInfo from "./StaffMoreInfoComponent";
// @ts-ignore
import CourseCardComponent from "./CourseCardComponent";

type cardProps = {
    id: string,
    imageSrc: StaticImageData;
    name: string;
    education: string;
    position: string;
    linkedin: string;
    github: string;
    mail: string;
    onClick?: () => void;
};



const CourseData = [
    {
        id: 1,
        imageSrc: CourseLogo,
        name: "C++ Programming",
        year: 1,
        semester: 1,
        status: 2,
        hour: 84,
    },
    {
        id: 2,
        imageSrc: CourseLogo,
        name: "Introduction to IT",
        year: 1,
        semester: 1,
        status: 2,
        hour: 84,
    },
    {
        id: 3,
        imageSrc: CourseLogo,
        name: "Programming Fundamental",
        year: 1,
        semester: 2,
        status: 3,
        hour: 84,
    },
    {
        id: 4,
        imageSrc: CourseLogo,
        name: "Intensive English Program I",
        year: 1,
        semester: 1,
        status: 2,
        hour: 84,
    },
];

export default function StaffDetailComponent ({ imageSrc, name, education, position, linkedin, github, mail }: cardProps) {
    return(
        <section>
            <div className="w-full rounded overflow-hidden grid grid-cols-4 gap-6 p-4 hover:cursor-pointer">
                <div className="col-span-1 space-y-4">
                    {/* profile */}
                    <div className="bg-white  w-full  p-6 rounded-[8px]">
                        <Image className="object-cover w-full rounded-[8px]" width={100} height={100} src={imageSrc}
                               alt="profile"/>
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                                <ImLinkedin className="w-7 h-7 text-lms-primary"/>
                            </Link>
                            <Link href={github} target="_blank" rel="noopener noreferrer">
                                <ImGithub className="w-7 h-7 text-lms-primary"/>
                            </Link>
                            <Link href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer">
                                <IoMdMail className="w-7 h-7 text-lms-primary"/>
                            </Link>
                        </div>
                    </div>

                    {/* education */}
                    <div className="bg-white w-full p-6 rounded-[8px] space-y-6">
                        <p className="text-3xl font-bold">Education</p>
                        <div className="flex justify-start items-start ">
                            <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                <FaGraduationCap className="w-8 h-8 text-lms-primary"/>
                            </div>
                            <p className="leading-tight">{education}</p>
                        </div>
                        <div className="flex justify-start items-center ">
                            <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                <FaGraduationCap className="w-8 h-8 text-lms-primary"/>
                            </div>
                            <p className="leading-tight">{education}</p>
                        </div>
                    </div>

                    {/* skill */}
                    <div className="bg-white w-full p-6 rounded-[8px] space-y-6">
                        <p className="text-3xl font-bold">Skill</p>
                        <div className="flex items-center ">
                            <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                            <BiSolidBookOpen className="w-8 h-8 text-lms-primary"/>
                            </div>
                            <p className="leading-tight">Specialized in Blockchain</p>
                        </div>
                        <div className="flex items-center ">
                            <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                <BiSolidBookOpen className="w-8 h-8 text-lms-primary"/>
                            </div>
                            <p className="leading-tight">Specialized in Python</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 space-y-6">
                    <div className="relative p-6 bg-white rounded-[8px]">
                        <div className="absolute top-6 right-6">
                            <MoreInfo/>
                        </div>
                        <p className="font-bold text-4xl ">{name}</p>
                        <p className="text-lms-gray-30 text-xl font-medium mb-6">{position}</p>

                        {/* contact information */}
                        <div className="space-y-4 mb-6">
                            {/* email */}
                            <div className="flex items-center">
                                <IoMdMail className="w-6 h-6 text-lms-primary mr-4"/>
                                <p className="leading-tight">{mail}</p>
                            </div>

                            {/* location */}
                            <div className="flex items-center">
                                <FaGraduationCap className="w-6 h-6 text-lms-primary mr-4"/>
                                <p className="leading-tight">
                                    No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia
                                </p>
                            </div>

                            {/* phone number */}
                            <div className="flex items-center">
                                <MdSmartphone className="w-6 h-6 text-lms-primary mr-4"/>
                                <p className="leading-tight">095 990 910</p>
                            </div>
                        </div>

                        <p className="text-gray-700 text-base mb-6">
                            Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private
                            blushes
                            removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed.
                            Mr
                            feeling does chiefly cordial in do.
                            We focus a great deal on the understanding of behavioral psychology and influence triggers
                            which
                            are crucial for becoming a well-rounded Digital Marketer. We understand that theory is
                            important
                            to build a solid foundation, we understand that theory alone isn’t going to get the job done
                            so
                            that’s why this course is packed with practical hands-on examples that you can follow step
                            by
                            step.
                        </p>

                        <p className="text-3xl font-bold mb-4">Documents</p>

                        <div className="flex gap-4">
                            {/* CV */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="border-1 bg-gray-100 rounded-[8px] flex items-center p-2">
                                        <div className="p-1 mr-4 rounded-[8px]">
                                            <Image className="w-12 h-12 rounded-[8px]" width={100} height={100} src={CV}
                                                   alt="cv"/>
                                        </div>
                                        <p className="leading-tight mr-4">Curriculum Vitae</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <Image className="object-cover w-full rounded-[8px] " width={100} height={100}
                                           src={imageSrc}
                                           alt="profile"/>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="border-1 bg-gray-100 rounded-[8px] flex items-center p-2">
                                        <div className="p-1 mr-4 rounded-[8px]">
                                            <Image className="w-12 h-12 rounded-[8px]" width={100} height={100} src={IdCard}
                                                   alt="cv"/>
                                        </div>
                                        <p className="leading-tight mr-4">ID Card</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <Image className="object-cover w-full rounded-[8px] " width={100} height={100}
                                           src={imageSrc}
                                           alt="profile"/>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {/* tabs */}
                    <div className="rounded-[8px]">
                        <Tabs defaultValue="current" className="w-full">

                            <TabsList className="grid w-[400px] grid-cols-2">
                                <TabsTrigger value="current">Current Course</TabsTrigger>
                                <TabsTrigger value="list">Course List</TabsTrigger>
                            </TabsList>

                            <TabsContent value="current">
                                <div className="flex flex-wrap gap-6 mt-6">
                                    {CourseData.filter(course => course.status === 1).length > 0 ? (
                                        CourseData.filter(course => course.status === 1).map((course) => (
                                            <CourseCardComponent
                                                id={course.id}
                                                key={course.id}
                                                imageSrc={course.imageSrc}
                                                name={course.name}
                                                year={course.year}
                                                semester={course.semester}
                                                hour={course.hour}
                                                status={course.status}
                                            />
                                        ))
                                    ) : (
                                        <div className="mx-auto">
                                            <p>No results</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="list">
                                <div className="flex flex-wrap gap-6 mt-6">
                                    {CourseData.map((course) => (
                                        <CourseCardComponent
                                            id={course.id}
                                            key={course.id}
                                            imageSrc={course.imageSrc}
                                            name={course.name}
                                            year={course.year}
                                            semester={course.semester}
                                            hour={course.hour}
                                            status={course.status}
                                        />
                                    ))}
                                </div>

                            </TabsContent>


                        </Tabs>
                    </div>

                </div>

            </div>
        </section>
    )
}