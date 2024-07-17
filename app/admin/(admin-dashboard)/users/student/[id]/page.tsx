'use client'
import Image from 'next/image';
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
import {useGetStudentByUuidQuery, useGetStudentQuery} from "@/lib/features/admin/user-management/student/student";
import placeholderImage from "@/public/common/placeholderPf.png"

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function Users(props: Props) {

    const { data: stuData, isLoading: isStuLoading, error: stuError ,isSuccess: isStudentSuccess} = useGetStudentByUuidQuery(props.params.id);

    if(isStudentSuccess){
    }

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    };

    return (
        <main className="flex flex-col h-full p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/admin/users" className='font-semibold text-gray-30 uppercase'>
                                student
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <h3 className="font-semibold text-lms-primary">DETAIL</h3>
                </BreadcrumbList>
            </Breadcrumb>
            {isStuLoading ? (
                <p className="h-screen flex items-center justify-center">Loading...</p>
            ) : stuError ? (
                <p>Error loading student data</p>
            ) : (
                <section className="flex flex-grow gap-6 p-6">
                    <div className="h-[557px] w-[404px] bg-white p-6 flex flex-col items-center rounded-[10px] gap-9 ">
                        <div className="h-[356px] w-[352px] rounded-[10px] relative">
                            <Image
                                src={stuData?.profileImage || placeholderImage}
                                alt="Placeholder Image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[10px]"
                            />
                        </div>

                        <div className="flex flex-col items-start w-full gap-4">
                            <p className="font-bold text-4xl">{stuData?.nameEn || 'N/A'}</p>
                            <p className="khmer-font text-lms-gray-30 text-xl">{stuData?.nameKh || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="h-[557px] w-full bg-white p-6 flex flex-col  rounded-[10px] gap-9 relative">
                        <div className="absolute top-6 right-6">
                            <MoreInfo stuUuid={props.params.id} />
                        </div>

                        <p className="font-bold text-4xl">Personal Information</p>

                        <div className="flex flex-col space-y-2 ml-4">
                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Gender</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl">{stuData?.gender || 'N/A'}</p>
                            </div>

                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Date Of Birth</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl">{stuData?.dob || 'N/A'}</p>
                            </div>

                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Personal Number</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl">{stuData?.phoneNumber || 'N/A'}</p>
                            </div>

                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Family Number</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl">{stuData?.phoneNumber || 'N/A'}</p>
                            </div>

                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Biography</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl w-4/5">
                                    {stuData?.bio || 'N/A'}
                                </p>
                            </div>

                            <div className="flex w-[90%]">
                                <p className="text-xl text-lms-gray-30 w-1/6">Email</p>
                                <p className="text-xl text-lms-gray-30 mr-6">:</p>
                                <p className="text-xl w-2/3">{stuData?.email || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start w-full gap-2 ml-4">
                            <p className="font-bold text-2xl">Documents</p>

                            {
                                (stuData.highSchoolCertificate || stuData.vocationTrainingCertificate || stuData.anyValuableCertificate) ? (
                                    <div className="flex justify-start w-full gap-16">
                                        {stuData?.highSchoolCertificate ? (
                                            <div className="flex items-center gap-3"
                                                 onClick={() => openInNewTab(stuData?.highSchoolCertificate)}>
                                                <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary"/>
                                                <p className="font-medium text-xl">Certificate</p>
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                        }

                                        {
                                            stuData?.vocationTrainingCertificate ? (
                                                <div className="flex items-center gap-3"
                                                     onClick={() => openInNewTab(stuData?.vocationTrainingCertificate)}>
                                                    <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary"/>
                                                    <p className="font-medium text-xl">Certificate</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }

                                        {
                                            stuData?.anyValuableCertificate ? (
                                                <div className="flex items-center gap-3"
                                                     onClick={() => openInNewTab(stuData?.anyValuableCertificate)}>
                                                    <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary"/>
                                                    <p className="font-medium text-xl">Certificate</p>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }


                                    </div>
                                ) : (
                                    <p>No information available.</p>
                                )
                            }


                        </div>
                    </div>
                </section>
            )}

        </main>
    );
}
