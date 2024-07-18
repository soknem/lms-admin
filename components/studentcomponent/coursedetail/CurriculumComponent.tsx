import React from "react";
import { BiSolidMessageSquareCheck } from "react-icons/bi";
import { Curriculum } from "@/lib/types/student/course";

type CurriculumComponentProps =  {
    courseTitle: string;
    courseDescription: string;
    curr: Curriculum | null;
}

export default function CurriculumComponent(
    {curr, courseTitle, courseDescription}: CurriculumComponentProps
) {
    const modules = curr?.modules || [];

    return (
        <div className="items-center p-[40px] bg-white rounded-lg my-10">
            {/* Course Title */}
            <h2 className="text-[36px] font-bold text-lms-black90 mb-[24px] uppercase ">
                {courseTitle}
            </h2>

            {/* Course Description */}
            <p className="text-lms-gray-80 text-[18px] mb-6 ">
                {courseDescription}
            </p>

            {/* Curriculum Heading */}
            <h3 className="text-[24px] font-bold text-lms-black90 mb-4">
                What you will learn in this course?
            </h3>

            {/* Curriculum List */}
            <div className="font-semibold text-[20px]">
                {modules.length > 0 ? (
                    modules.map((item, index) => (
                        <div key={index} className="flex items-center mb-[10px]">
                            <BiSolidMessageSquareCheck className="text-lms-primary w-[27px] h-[27px] mr-[34px]" />
                            <span>{item.content}</span>
                        </div>
                    ))
                ) : (
                    <p className="w-full flex justify-center">No data of curriculum .</p>
                )}
            </div>
        </div>
    );
}
