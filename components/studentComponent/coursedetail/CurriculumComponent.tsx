import React from "react";
import { BiSolidMessageSquareCheck } from "react-icons/bi";

// Object containing course details

const courseDetails = {
  title: "C++ PROGRAMMING",
  description:
    "C++ is one of the world's most popular programming languages. C++ can be found in today's operating systems, Graphical User Interfaces, and embedded systems. C++ programming course will guide you from basic language syntax to OOP concepts step by step. Please see the details course offer below",
};
//listing the curriculum topics
const curriculumList = [
  "Programming Language concept",
  "Basic Languages Syntax",
  "Control Flow",
  "Functions",
  "Object Oriented Programming",
  "Create Console Project",
  "Problem Solving",
  "Final Project",
];

export default function CurriculumComponent() {
  return (
    <div className="items-center p-[40px] bg-white rounded-lg my-10">
      {/* Course Title */}

      <h2 className="text-[36px] font-bold text-black_90 mb-[24px]">
        {courseDetails.title}
      </h2>
      {/* Course Description */}

      <p className="text-gray-80 text-[18px] mb-6 ">
        {courseDetails.description}
      </p>
      {/* Curriculum Heading */}

      <h3 className="text-[24px] font-bold text-black_90 mb-4">
        What you will learn in this course?
      </h3>
      {/* Curriculum List */}

      <div className="font-semibold text-[20px]">
        {curriculumList.map((item, index) => (
          <div key={index} className="flex items-center mb-[10px]">
            <BiSolidMessageSquareCheck className="text-primary w-[27px] h-[27px] mr-[34px]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
