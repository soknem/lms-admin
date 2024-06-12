'use client'
import { ImLinkedin } from "react-icons/im";
import { ImGithub } from "react-icons/im";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type cardProps = {
    imageSrc: StaticImageData,
    name: string,
    education: string,
    position: string,
    linkedin: string,
    github: string,
    onClick?: () => void
}

export default function InstructorCardComponent({ imageSrc, name, education, position, linkedin ,github , onClick } : cardProps) {
    return (
        <div className="w-full rounded overflow-hidden bg-white grid grid-cols-3 p-4 hover:cursor-pointer" onClick={onClick}>
            <Image className=" col-span-1 w-full h-full object-cover " width={100} height={100}  src={imageSrc} alt="profile" />
            <div className="px-6 col-span-2 ">
                <p className="font-bold text-xl">{name}</p>
                <p className="mb-4 text-lms-primary" >{position}</p>
                <p className="text-gray-700 text-base">
                    {education}
                </p>

                <div className="flex gap-2 mt-6">
                    <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                        <ImLinkedin className="w-6 h-6 text-lms-primary" />
                    </Link>
                    <Link href={github} target="_blank" rel="noopener noreferrer">
                        <ImGithub className="w-6 h-6 text-lms-primary" />
                    </Link>
                </div>


            </div>

        </div>
    );
}