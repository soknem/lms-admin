"use client";
import { ImLinkedin, ImGithub, ImPhone } from "react-icons/im";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CardProps = {
  imageSrc: StaticImageData;
  name: string;
  education: string;
  position: string;
  linkedin: string;
  github: string;
  //   website: string;
  //   phone: string;
  //   email: string;
  onClick?: () => void;
};

export default function InstructorCardComponent({
  imageSrc,
  name,
  education,
  position,
  linkedin,
  github,
  //   website,
  //   phone,
  //   email,
  onClick,
}: CardProps) {
  return (
    <main className="bg-white items-centerrounded-lg shadow-md p-4 hover:cursor-pointer">
      <div className="flex flex-row " onClick={onClick}>
        <Image
          className="rounded-xl w-[200px] h-[200px] object-cover"
          width={200}
          height={200}
          src={imageSrc}
          alt="profile"
        />
        <div className=" ml-6">
          <p className="font-bold text-[25px] text-lms-primary">{name}</p>
          <p className="text-lms-primary mb-2 font-medium">{position}</p>
          <p className="text-lms-black90 text-[18px]">{education}</p>
          <div className="flex gap-3 mt-4  ">
            <Link href={linkedin} target="_blank" rel="noopener noreferrer">
              <ImLinkedin className="w-6 h-6 text-lms-primary" />
            </Link>
            <Link href={github} target="_blank" rel="noopener noreferrer">
              <ImGithub className="w-6 h-6 text-lms-primary" />
            </Link>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <TbWorld className="w-6 h-6 text-lms-primary" />
            </Link>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <ImPhone className="w-6 h-6 text-lms-primary" />
            </Link>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <MdEmail className="w-6 h-6 text-lms-primary" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
