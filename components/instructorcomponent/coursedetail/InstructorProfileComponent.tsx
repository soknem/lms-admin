'use client';

import React from "react";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import CV from "@/public/staff/cv.png";
import IdCard from "@/public/staff/idcard.png";
import {ImLinkedin, ImGithub} from "react-icons/im";
import {IoIosPin, IoMdMail} from "react-icons/io";
import {FaGraduationCap} from "react-icons/fa";
import {MdSmartphone} from "react-icons/md";
import {BiSolidBookOpen} from "react-icons/bi";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    useGetInsAllCourseByUuidQuery,
    useGetInsCurrentCourseByUuidQuery
} from "@/lib/features/admin/user-management/instructor/instructor";
import MoreInfo from "@/components/admincomponent/users/staff/StaffMoreInfoComponent";
import CourseCardComponent from "@/components/admincomponent/users/staff/CourseCardComponent";
import placeholderImage from "@/public/common/placeholderPf.png";

type CardProps = {
    id: string;
    name: string;
    education: string[];
    position: string;
    linkedin: string;
    github: string;
    mail: string;
    skills: string[];
    currentAddress: string;
    profileImage: string | null;
    birthPlace: string;
    linkTelegram: string;
    uploadCv: string;
    identityCard: string;
    phoneNumber: string;
    bio: string;
};

export default function InstructorProfileComponent({
                                                       id,
                                                       name,
                                                       position,
                                                       linkedin,
                                                       github,
                                                       mail,
                                                       skills,
                                                       currentAddress,
                                                       profileImage,
                                                       linkTelegram,
                                                       uploadCv,
                                                       identityCard,
                                                       phoneNumber,
                                                       bio,
                                                       education,
                                                   }: CardProps) {

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    };

    const educationArray = Array.isArray(education) ? education : [];
    const skillArray = Array.isArray(skills) ? skills : [];

    return (
        <section>
            <div className="w-full rounded overflow-hidden grid grid-cols-4 gap-6 p-4 hover:cursor-pointer">
                <div className="col-span-1 space-y-4">
                    {/* profile */}
                    <div className="bg-white  w-full  p-6 rounded-[8px]">
                        <Image className="object-cover w-full rounded-[8px]"
                               width={100}
                               height={100}
                               src={profileImage || "/placeholder.jpg"}
                               alt="profile"
                        />
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                                <ImLinkedin className="w-7 h-7 text-lms-primary"/>
                            </Link>
                            <Link href={github} target="_blank" rel="noopener noreferrer">
                                <ImGithub className="w-7 h-7 text-lms-primary"/>
                            </Link>
                            <Link href={`mailto:${linkTelegram}`} target="_blank" rel="noopener noreferrer">
                                <IoMdMail className="w-7 h-7 text-lms-primary"/>
                            </Link>
                        </div>
                    </div>

                    {educationArray.length !== 0 && (
                        <div className="bg-white w-full p-6 rounded-[8px] space-y-6">
                            <p className="text-3xl font-bold">Education</p>
                            {educationArray.map((edu, index) => (
                                <div key={index} className="flex justify-start items-center ">
                                    <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                        <FaGraduationCap className="w-8 h-8 text-lms-primary"/>
                                    </div>
                                    <p className="leading-tight">{edu}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {skillArray.length !== 0 && (
                        <div className="bg-white w-full p-6 rounded-[8px] space-y-6">
                            <p className="text-3xl font-bold">Skill</p>
                            {skillArray.map((sk, index) => (
                                <div key={index} className="flex justify-start items-center ">
                                    <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                        <BiSolidBookOpen className="w-8 h-8 text-lms-primary"/>
                                    </div>
                                    <p className="leading-tight">{sk}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-span-3 space-y-6">
                    <div className="relative p-6 bg-white rounded-[8px]">
                        {/*<div className="absolute top-6 right-6">*/}
                        {/*    <MoreInfo staffUuid={id} isDeletedState={isDeleted} position={position}/>*/}
                        {/*</div>*/}
                        <p className="font-bold text-4xl uppercase">{name}</p>
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
                                <IoIosPin className="w-6 h-6 text-lms-primary mr-4"/>
                                <p className="leading-tight">
                                    {currentAddress}
                                </p>
                            </div>

                            {/* phone number */}
                            <div className="flex items-center">
                                <MdSmartphone className="w-6 h-6 text-lms-primary mr-4"/>
                                <p className="leading-tight">{phoneNumber}</p>
                            </div>
                        </div>

                        {/*bio*/}
                        <p className="text-gray-700 text-base mb-6">
                            {bio}
                        </p>

                        <p className="text-3xl font-bold mb-4">Documents</p>

                        <div className="flex gap-4">
                            {/* CV */}
                            <div className="border rounded-[8px] flex items-center p-2 cursor-pointer"
                                 onClick={() => openInNewTab(uploadCv)}>
                                <div className="p-1 mr-4 rounded-[8px]">
                                    <Image className="w-12 h-12 rounded-[8px]" width={100} height={100} src={CV}
                                           alt="cv"/>
                                </div>
                                <p className="leading-tight mr-4">Curriculum Vitae</p>
                            </div>

                            {/* ID Card */}
                            <div className="border rounded-[8px] flex items-center p-2 cursor-pointer"
                                 onClick={() => openInNewTab(identityCard)}>
                                <div className="p-1 mr-4 rounded-[8px]">
                                    <Image className="w-12 h-12 rounded-[8px]" width={100} height={100} src={IdCard}
                                           alt="id card"/>
                                </div>
                                <p className="leading-tight mr-4">ID Card</p>
                            </div>
                        </div>
                    </div>

                    {/*<div className="rounded-[8px]">*/}
                    {/*    {position !== 'INSTRUCTOR' ? null :*/}
                    {/*        (!currentCourseData || currentCourseData.courseInstructor.length === 0) &&*/}
                    {/*        (!courseData || courseData.courseInstructor.length === 0) ? (*/}
                    {/*            <div className="mx-auto">*/}
                    {/*                <p>No courses available</p>*/}
                    {/*            </div>*/}
                    {/*        ) : (*/}
                    {/*            <Tabs defaultValue="current" className="w-full">*/}
                    {/*                <TabsList className="grid w-[400px] grid-cols-2">*/}
                    {/*                    {currentCourseData && currentCourseData.courseInstructor.length > 0 && (*/}
                    {/*                        <TabsTrigger value="current">Current Course</TabsTrigger>*/}
                    {/*                    )}*/}
                    {/*                    {courseData && courseData.courseInstructor.length > 0 && (*/}
                    {/*                        <TabsTrigger value="list">Course List</TabsTrigger>*/}
                    {/*                    )}*/}
                    {/*                </TabsList>*/}

                    {/*                {isCurrentCourseLoading ? (*/}
                    {/*                    <div>Loading...</div>*/}
                    {/*                ) : currentCourseData && currentCourseData.courseInstructor.length > 0 ? (*/}
                    {/*                    <TabsContent value="current">*/}
                    {/*                        <div className="flex flex-wrap gap-6 mt-6">*/}
                    {/*                            {currentCourseData.courseInstructor.map((course: any) => (*/}
                    {/*                                <CourseCardComponent*/}
                    {/*                                    id={course.uuid}*/}
                    {/*                                    key={course.uuid}*/}
                    {/*                                    imageSrc={course?.courseLogo || placeholderImage}*/}
                    {/*                                    name={course?.courseTitle || "N/A"}*/}
                    {/*                                    year={course?.year || "N/A"}*/}
                    {/*                                    semester={course?.semester || "N/A"}*/}
                    {/*                                    hour={course?.hours || "N/A"}*/}
                    {/*                                    status={course?.status || "N/A"}*/}
                    {/*                                />*/}
                    {/*                            ))}*/}
                    {/*                        </div>*/}
                    {/*                    </TabsContent>*/}
                    {/*                ) : (*/}
                    {/*                    <div className="mx-auto">*/}
                    {/*                        <p>No current courses available</p>*/}
                    {/*                    </div>*/}
                    {/*                )}*/}

                    {/*                {isCourseLoading ? (*/}
                    {/*                    <div>Loading...</div>*/}
                    {/*                ) : courseData && courseData.courseInstructor.length > 0 ? (*/}
                    {/*                    <TabsContent value="list">*/}
                    {/*                        <div className="flex flex-wrap gap-6 mt-6">*/}
                    {/*                            {courseData.courseInstructor.map((course: any) => (*/}
                    {/*                                <CourseCardComponent*/}
                    {/*                                    id={course.uuid}*/}
                    {/*                                    key={course.uuid}*/}
                    {/*                                    imageSrc={course?.courseLogo || placeholderImage}*/}
                    {/*                                    name={course?.courseTitle || "N/A"}*/}
                    {/*                                    year={course?.year || "N/A"}*/}
                    {/*                                    semester={course?.semester || "N/A"}*/}
                    {/*                                    hour={course?.hours || "N/A"}*/}
                    {/*                                    status={course?.status || "N/A"}*/}
                    {/*                                />*/}
                    {/*                            ))}*/}
                    {/*                        </div>*/}
                    {/*                    </TabsContent>*/}
                    {/*                ) : (*/}
                    {/*                    <div className="mx-auto">*/}
                    {/*                        <p>No courses available</p>*/}
                    {/*                    </div>*/}
                    {/*                )}*/}
                    {/*            </Tabs>*/}
                    {/*        )}*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}
