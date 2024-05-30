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
    <Card className="w-[500px] h-[280px] bg-white">
      <CardHeader>
        <CardTitle className="text-primary font-bold mb-4">{courseCardData.title}</CardTitle>
        <CardDescription className="text-gray-600 ">{courseCardData.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex  ">
        <div className="flex items-center ">
          {courseCardData.images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={50}
              height={50}
              className=" rounded-full object-cover"
            />
          ))}
        </div>
        <div className="mt-4 ml-32">
          <p>Year: {courseCardData.year}</p>
          <p>Semester: {courseCardData.semester}</p>
          <p>Credit: {courseCardData.credit} credits</p>
          <p>Progress:</p>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${courseCardData.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
