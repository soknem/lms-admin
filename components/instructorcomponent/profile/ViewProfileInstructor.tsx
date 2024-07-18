'use client';

import React from "react";
import Link from "next/link";
import {ImLinkedin, ImGithub} from "react-icons/im";
import {IoIosPin, IoMdMail} from "react-icons/io";
import {FaGraduationCap} from "react-icons/fa";
import {MdSmartphone} from "react-icons/md";
import {BiSolidBookOpen} from "react-icons/bi";
import {FaTelegram} from "react-icons/fa6";
import {CardInstructorProps} from "@/lib/types/instructor/ViewProfile";
import {TooltipProvider, Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";

export default function ViewProfileInstructor({
                                                  id,
                                                  profileImage,
                                                  name,
                                                  education,
                                                  position,
                                                  linkedin,
                                                  github,
                                                  mail,
                                                  skills,
                                                  currentAddress,
                                                  linkTelegram,
                                                  phoneNumber,
                                                  bio,
                                              }: CardInstructorProps) {

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    };

    const educationArray = Array.isArray(education) ? education : [];
    const skillArray = Array.isArray(skills) ? skills : [];

    return (
        <TooltipProvider>
            <section>
                <section
                    className="w-full rounded overflow-hidden grid grid-cols-3 grid-rows-2  gap-x-[20px] gap-y-[60px] px-[100px] hover:cursor-pointer">

                    <section className="col-span-1 row-span-2">

                        {/* profile */}
                        <section className="w-full p-6 rounded-[8px]">
                            {/* Instructor Profile */}
                            <img className="object-cover rounded-[8px] w-full "
                                 src={`${profileImage}`}
                                 alt="profile"
                            />

                            <section className="flex my-4 gap-4 justify-between px-3">
                                {/* Email */}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={mail} target={"_blank"} rel="noopener noreferrer">
                                            <IoMdMail className="w-7 h-7 text-lms-primary "/>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{mail}</p>
                                    </TooltipContent>
                                </Tooltip>

                                {/* LinkedIn */}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                                            <ImLinkedin className="w-6 h-6 text-lms-primary mt-1"/>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{linkedin}</p>
                                    </TooltipContent>
                                </Tooltip>


                                {/* GitHub */}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={github} target="_blank" rel="noopener noreferrer">
                                            <ImGithub className="w-7 h-7 text-lms-primary hover:"/>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{github}</p>
                                    </TooltipContent>
                                </Tooltip>


                                {/* Telegram */}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={linkTelegram} target="_blank" rel="noopener noreferrer">
                                            <FaTelegram className="w-7 h-7 text-lms-primary"/>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{linkTelegram}</p>
                                    </TooltipContent>
                                </Tooltip>

                            </section>


                            <section className=" flex flex-col gap-4 pt-4">

                                <div className="flex flex-col gap-1">
                                    {/* Instructor name */}
                                    <p className="font-bold text-3xl uppercase">{name}</p>

                                    {/* Position */}
                                    <p className="text-lms-gray-30 text-xl font-medium">{position}</p>

                                </div>
                                {/* location */}
                                <div className="flex items-center">
                                    <IoIosPin className="w-7 h-7 text-lms-primary mr-4"/>
                                    <p className="leading-tight">
                                        {currentAddress}
                                    </p>
                                </div>

                                {/* phone number */}
                                <div className="flex items-center">
                                    <MdSmartphone className="w-7 h-7 text-lms-primary mr-4"/>
                                    <p className="leading-tight">{phoneNumber}</p>
                                </div>

                                {/* bio */}
                                <p className="text-gray-700 text-base mb-6">
                                    {bio}
                                </p>
                            </section>


                        </section>

                    </section>


                    <section className="col-span-2 mt-4 h-full">

                        <div className=" flex gap-x-[40px] ">

                            <section className="w-[50%] ">
                                {skillArray.length !== 0 && (
                                    <div className="bg-white w-full p-6 rounded-[8px] space-y-6 h-full ">
                                        <p className="text-3xl font-bold">Instructor Skill</p>
                                        {skillArray.map((sk, index) => (
                                            <div key={index} className="flex justify-start items-center">
                                                <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                                    <BiSolidBookOpen className="w-8 h-8 text-lms-primary"/>
                                                </div>
                                                <p className="leading-tight">{sk}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section className="w-[50%] ">
                                {educationArray.length !== 0 && (
                                    <div className="bg-white w-full p-6 rounded-[8px] space-y-6 h-full ">
                                        <p className="text-3xl font-bold">Instructor Education</p>
                                        {educationArray.map((edu, index) => (
                                            <div key={index} className="flex justify-start items-center">
                                                <div className="bg-lms-primary/20 p-1 mr-4 rounded-[8px]">
                                                    <FaGraduationCap className="w-8 h-8 text-lms-primary"/>
                                                </div>
                                                <p className="leading-tight">{edu}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>


                        </div>

                    </section>


                </section>
            </section>
        </TooltipProvider>
    );
}
