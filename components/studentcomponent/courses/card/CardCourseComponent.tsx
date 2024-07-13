'use client'
import * as React from "react";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import courseCardData from "./CourseCardData"; // Adjust the path as needed
import {useRouter} from "next/navigation";
import {CourseType} from "@/lib/types/student/course";


type CourseCardProps = CourseType & { onClick: () => void };

export function CardCourseComponent({
                                        title,
                                        credit,
                                        progress,
                                        semester,
                                        year,
                                        description,
                                        onClick,
                                        instructorProfileImage,
                                        logo,
                                    }: CourseCardProps) {
    const router = useRouter();

    const ImageArray = [
        logo,
        instructorProfileImage,
    ]
    return (
        <Card className=" xl:max-w-[566px]  xl:h-[299px]  w-[610px]  bg-white" onClick={onClick}>
            <CardHeader className="mx-[40px]">
                <CardTitle className="text-lms-primary font-bold text-[24px] line-clamp-1">
                    {title.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-lms-black90 text-[16px] line-clamp-3">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex mx-[40px]">
                <div className="flex items-center -space-x-4 ">
                    {ImageArray.map((image, index) => {
                        if (image) {
                            return (
                                <Image
                                    onClick={() => router.push("/instructor/courses/int-profile")}
                                    key={index}
                                    src={image}
                                    alt={`Image ${index}`}
                                    width={64}
                                    height={64}
                                    className=" h-[64px] w-[64] rounded-full object-cover ring-2 ring-white"
                                />
                            )
                        }
                    })}
                </div>
                {/* Add content here */}
                <div className="mt-4 ml-[100px]">
                    <div className="flex gap-4">
                        <p>Year: {year}</p>
                        <p>Semester: {semester}</p>
                    </div>
                    <p>Credit: {credit} credits</p>
                    <div className="flex items-center gap-4">
                        <p>Progress:</p>
                        <div className="relative pt-3 flex-1">
                            <div className="overflow-hidden h-2 w-[85px] mb-2 text-xs flex rounded bg-gray-200">
                                <div
                                    style={{width: `${progress}%`}}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lms-success"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}