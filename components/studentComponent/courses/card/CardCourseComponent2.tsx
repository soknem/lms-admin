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
// @ts-ignore

const courseCardData = {
  title: "Docker",
  description: "Docker is a containerized tool that designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package...",
  year: 1,
  semester: 2,
  credit: 45,
  progress: 75, // This can be a percentage for the progress bar
  images: [
    { src: "/docker.png", alt: "Flutter Logo" },
    { src: "/intructor.jpg", alt: "Student Photo" },
  ],
};
export function CardCourseComponent2() {
  return (
    <a href="/student/courses/coursedetail">
    <Card className="w-[566px] h-[299px] bg-white">
      <CardHeader className="mx-[40px]">
        <CardTitle className="text-primary font-bold text-[24px] ">
          {courseCardData.title}
        </CardTitle>
        <CardDescription className="text-lms-gray-80 text-[18px]">
          {courseCardData.description}
        </CardDescription>
      </CardHeader>
     <CardContent className="flex mx-[40px]">
      <div className="flex items-center -space-x-4 ">
        {courseCardData.images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={64}
            height={64}
            className=" h-[64px] w-[64] rounded-full object-cover ring-2 ring-white"
          />
        ))}
      </div>
      <div className="mt-4 ml-[100px]">
        <div className="flex gap-4">
          <p>Year: {courseCardData.year}</p>
          <p>Semester: {courseCardData.semester}</p>
        </div>

        <p>Credit: {courseCardData.credit} credits</p>
        <div className="flex items-center gap-4 ">
          <p>Progress:</p>
          <div className="relative pt-3 flex-1">
            <div className="overflow-hidden h-2 w-[85px] mb-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${courseCardData.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lms-success"
              ></div>
            </div>
          </div>
        </div>
      </div>
      </CardContent> 
    </Card>
    </a>
  );
}
