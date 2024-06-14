import React from "react";
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import instructorProfile from "@/public/intructor.jpg";
import StaffDetailComponent from "@/components/admincomponent/users/staff/StaffDetailComponent";
// import InstructorDetail from "@/components/adminComponent/users/staff/InstructorDetail";

const insData = {
    id: "000001",
    imageSrc: instructorProfile,
    name: "Sang Sokea",
    education: "Bachelor of Science in Computer Science University of California Berkeley and Graduated in May 2022",
    position: "Instructor",
    linkedin: "https://www.linkedin.com/in/sang-sokea",
    github: "https://github.com/SangSokea",
    mail: "sangsokea@gmail.com"
};

export default function StaffDetail() {
    return (
        <main>
            <section className="flex flex-col gap-4 h-full w-full p-9">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/instructor/courses" className='font-semibold text-gray-30 uppercase'>
                                    COURSE
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-lms-primary uppercase">
                                Sang Sokea
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <StaffDetailComponent
                    key={insData.id}
                    id={insData.id}
                    imageSrc={insData.imageSrc}
                    name={insData.name}
                    education={insData.education}
                    position={insData.position}
                    linkedin={insData.linkedin}
                    github={insData.github}
                    mail={insData.mail}
                />
            </section>
        </main>
    );
}
