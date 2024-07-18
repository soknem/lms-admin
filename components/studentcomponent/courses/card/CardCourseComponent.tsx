import * as React from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {CourseType} from "@/lib/types/instructor/courseDetail";

type CourseCardProps = CourseType;

export function CardCourseComponent({
                                        title,
                                        credit,
                                        semester,
                                        year,
                                        description,
                                        onClick,
                                        instructorProfileImage,
                                        logo,
                                        progress,
                                    }: CourseCardProps) {
    const router = useRouter();

    const courseCardData = {
        images: [
            {src: logo, alt: "Course Logo"},
            {src: instructorProfileImage, alt: "Student Photo"},
        ],
    };

    return (
        <Card
            className="w-[566px] h-[299px] bg-white transition-transform duration-300 transform hover:scale-[101%] relative custom-border-animation"
            onClick={onClick}
        >
            <CardHeader className="mx-[40px]">
                <CardTitle className="text-lms-primary font-bold text-[24px] line-clamp-1">
                    {title.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-lms-black90 text-[16px] line-clamp-3 md:h-[70px]">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-around relative">
                <img
                    src={logo || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"}
                    alt="Course Logo"
                    className="h-[45px] w-[45px] rounded-full object-cover ring-2 ring-white mt-8"
                />

                <img
                    src={instructorProfileImage || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                    alt="Instructor Profile"
                    className=" absolute left-[98px] h-[45px] w-[45px] rounded-full object-cover ring-2 ring-white mt-8 "
                />

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
