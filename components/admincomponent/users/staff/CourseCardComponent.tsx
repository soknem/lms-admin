'use client'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"
import {ImLinkedin} from "react-icons/im";
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


type cardProps = {
    id: number,
    imageSrc: StaticImageData,
    name: string,
    year: number,
    semester: number,
    status: number,
    hour: number,
    onClick?: () => void
}

const getTypeStatus = (type : number) => {
    switch (type) {
        case 1:
            return <span className="text-lms-success font-semibold">In Progress</span>;
        case 2:
            return <span className="text-[#C29343] font-semibold">Pending</span>;
        case 3:
            return <span className="text-lms-error  font-semibold">Ended</span>;
        default:
            return <span className="text-lms-gray-30 font-semibold">Not Started</span>;
    }
};

function CourseCardComponent({ id,imageSrc, name ,year, semester, status , hour, onClick } : cardProps) {
    const router = useRouter();
    return (
        <div className="w-[280px] rounded overflow-hidden bg-white  p-4 hover:cursor-pointer space-y-2" onClick={onClick}>
            <Image className=" w-full  object-cover " width={100} height={100} src={imageSrc} alt="profile"/>
            <p className="font-semibold text-lg">{name}</p>
            <div className="flex gap-4">
                <p><span>Year: </span><b>{year}</b></p>
                <p><span>Semester: </span><b>{semester}</b></p>
                <p><span>Hour: </span><b>{hour}</b></p>
            </div>
            <hr className="mt-4" />
            <div className="flex items-center justify-between">
                {getTypeStatus(status)}
                <Button className="hover:bg-gray-50 rounded-lg font-semibold" onClick={() => router.push(`/instructor/courses/coursedetail`)}>View More</Button>
            </div>
        </div>
    );
}

export default CourseCardComponent;