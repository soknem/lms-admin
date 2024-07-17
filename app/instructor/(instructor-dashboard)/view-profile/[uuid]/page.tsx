'use client'
import {useGetInstructorByUuidQuery} from "@/lib/features/instructor/course/instructorCourse";
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {PropsParam} from "@/lib/types/student/course";
import {InstructorViewProfile} from "@/lib/types/instructor/ViewProfile";
import LoadingComponent from "@/app/(auth)/loading";
import ViewProfileInstructor from "@/components/instructorcomponent/profile/ViewProfileInstructor";



export default function InstructorProfile({params} : PropsParam) {


    const uuid = params.uuid;
    const {data, error, isLoading} = useGetInstructorByUuidQuery({uuid});
    if (isLoading) return <LoadingComponent/>

    const dataProfile : InstructorViewProfile = data;


    return (
        <main>
            <section className="flex flex-col gap-4 h-full w-full p-9">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/student/courses" className='font-semibold text-gray-30 uppercase'>
                                    COURSE
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-lms-primary uppercase">
                                {dataProfile.nameEn}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ViewProfileInstructor
                    key={dataProfile.uuid}
                    id={dataProfile.uuid}
                    profileImage={dataProfile.profileImage || "/placeholder.jpg"}
                    name={dataProfile.nameEn || "Unknown Instructor"}
                    education={dataProfile.educations || []}
                    position={dataProfile.position || "Unknown Position"}
                    linkedin={dataProfile.linkLinkedin || "Unknown Linkedin"}
                    github={dataProfile.linkGit || "Unknown Github"}
                    mail={dataProfile.email || "Unknown Email"}
                    skills={dataProfile.skills || []}
                    currentAddress={dataProfile.currentAddress || "Unknown Address"}
                    linkTelegram={dataProfile.linkTelegram || "Unknown Telegram"}
                    phoneNumber={dataProfile.phoneNumber || "Unknown Phone Number"}
                    bio={dataProfile.bio || "Unknown Bio"}
                />
            </section>
        </main>
    );
}
