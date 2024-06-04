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

export function CardCourseComponent() {
  return (
    <Card className="w-[566px] h-[299px] bg-white">
      <CardHeader className="mx-[40px]">
        <CardTitle className="text-primary font-bold text-[24px] mb-[15px]">
          {courseCardData.title}
        </CardTitle>
        <CardDescription className="text-gray-80 text-[16px] leading-[24px]">
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
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"
              ></div>
            </div>
          </div>
        </div>
      </div>
      </CardContent> 
    </Card>
  );
}
