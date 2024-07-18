'use client'
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
import InstructorProfileComponent from "@/components/instructorcomponent/coursedetail/InstructorProfileComponent";
import {useSelector} from "react-redux";
import {selectLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {selectStaffByUUID} from "@/lib/features/admin/user-management/staff/staffSlice";
import {RootState} from "@/lib/store";
import {useGetStaffByUuidQuery, useGetStaffQuery} from "@/lib/features/admin/user-management/staff/staff";
import placeholderImage from "@/public/common/placeholderPf.png";
import {useGetInsDetailByUuidQuery} from "@/lib/features/admin/user-management/instructor/instructor";


type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function StaffDetail(props: Props) {

    const { data : staffData , error : staffError,isSuccess: isStaffSuccess ,isLoading: isStaffLoading} = useGetStaffByUuidQuery(props.params.id)


    const { data : insData , error : insError,isSuccess: isInsSuccess ,isLoading: isInsLoading} = useGetInsDetailByUuidQuery(props.params.id)


    if(isStaffLoading){
        return <div className="flex justify-center items-center min-h-screen">
            Loading...
        </div>
    }

    const data = staffData?.position === "INSTRUCTOR" ? insData : staffData;


    return (
        <main>
            <section className="flex flex-col gap-4 h-full w-full p-9">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/admin/users" className='font-semibold text-gray-30 uppercase'>
                                    staff
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-lms-primary uppercase">
                                {data?.nameEn || "N/A"}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <InstructorProfileComponent
                    key={data?.uuid}
                    id={props.params.id}
                    profileImage={data?.profileImage || placeholderImage}
                    name={data?.nameEn || "N/A"}
                    education={data?.educations || []}
                    skills={data?.skills || []}
                    position={data?.position || "N/A"}
                    linkedin={data?.linkLinkedin || "N/A"}
                    github={data?.linkGit || "N/A"}
                    mail={data?.email || "N/A"}
                    currentAddress={data?.currentAddress || "N/A"}
                    birthPlace={data?.birthPlace || "N/A"}
                    linkTelegram={data?.linkTelegram || "N/A"}
                    uploadCv={data?.uploadCv}
                    identityCard={data?.identityCard}
                    phoneNumber={data?.phoneNumber || "N/A"}
                    bio={data?.bio || "N/A"}
                />
            </section>
        </main>
    );
}
