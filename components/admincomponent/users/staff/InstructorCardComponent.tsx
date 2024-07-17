"use client";
import { ImLinkedin, ImGithub, ImPhone } from "react-icons/im";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";

type CardProps = {
  imageSrc: string | StaticImageData;
  name: string;
  education: [];
  position: string;
  linkedin: string;
  github: string;
  telegram: string;
  email: string;
  skills: [];
  phoneNumber: string;
  onClick?: () => void;
};

export default function InstructorCardComponent({
  imageSrc,
  name,
  education,
  position,
  linkedin,
  github,
  telegram,
  email,
  skills,
    phoneNumber,
  onClick,
}: CardProps) {
  return (
    <main className="bg-white items-centerrounded-lg rounded-[4px] p-4 hover:cursor-pointer">
      <div className="flex flex-row " onClick={onClick}>
        <Image
          className="rounded-xl w-[200px] h-[200px] object-cover"
          width={200}
          height={200}
          src={imageSrc}
          alt="profile"
        />
        <div className=" ml-6 flex flex-col  justify-between">
          <div>
            <p className="font-bold text-[25px] text-lms-black-90">{name}</p>
            <p className="text-lms-primary mb-2 font-medium">{position}</p>
          </div>

          <div className="line-clamp-2 ">
            {education.map((item, index) => (
                <p key={index} className="text-lms-black90 text-[18px]">{item}</p>
            ))}
          </div>

          <div className="line-clamp-1">
            {skills.map((item, index) => (
                <span key={index} className="text-lms-primary text-[16px] border border-lms-primary rounded-xl px-2 mr-2">{item}</span>
            ))}
          </div>


          <div className="flex gap-3 mt-4  ">
            <Link href={linkedin} target="_blank" rel="noopener noreferrer">
              <ImLinkedin className="w-6 h-6 text-lms-primary"/>
            </Link>
            <Link href={github} target="_blank" rel="noopener noreferrer">
              <ImGithub className="w-6 h-6 text-lms-primary"/>
            </Link>
            <Link href={email} target="_blank" rel="noopener noreferrer">
              <FaTelegram className="w-6 h-6 text-lms-primary"/>
            </Link>
            <Link href={phoneNumber} target="_blank" rel="noopener noreferrer">
              <ImPhone className="w-6 h-6 text-lms-primary"/>
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
