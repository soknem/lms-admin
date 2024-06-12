import React from "react";
import Image from "next/image";

// Data structure for course details
const courseData = {
  // Course metadata
  semester: "Semester 1",
  title: "C++ PROGRAMMING",
  description:
    "C++ is one of the world's most popular programming languages. C++ can be found in today's operating systems, Graphical User Interfaces, and embedded systems",
  credits: {
    total: 3,
    theory: 2,
    practice: 1,
  },
  instructor: {
    name: "Chan Samangrathnana",
    title: "IT Instructor",
    image: "/intructor.jpg",
  },
  studentsJoined: 30,
  classStart: "Oct 26, 2024",
  logo: "/logocourse.png",
  studentImages: [
    "/admin.png",
    "/student3.jpg",
    "/student2.jpg",
    "/student3.jpg",
    "/student2.jpg",
    "/student2.jpg",
  ],
};
/**
 * Component to display detailed information about a course.
 */

export default function CourseDetailHeader() {
  return (
    <main>
      {/* Course Overview Section */}
      <section className="mx-[90px] flex flex-col-2 ">
        <div className="h-[250px]">
          {/* Semester Badge */}
          <span className="px-[25px] py-1 text-sm font-semibold text-white bg-lms-secondary rounded-full mb-10">
            {courseData.semester}
          </span>
          {/* Course Title */}
          <h2 className="text-[40px] font-bold text-lms-black90 mt-[14px]">
            {courseData.title}
          </h2>
          {/* Course Description */}
          <p className="text-lms-gray-80 w-[803px] text-[18px] mt-[14px]">
            {courseData.description}
          </p>
          {/* Credits Information */}
          <div className="flex items-center mt-[20px]">
            <span className="mr-4 font-semibold">
              Credit: {courseData.credits.total}
            </span>
            <span className="mr-4 font-semibold">
              | Theory: {courseData.credits.theory}
            </span>
            <span className="mr-4 font-semibold">
              | Practice: {courseData.credits.practice}
            </span>
          </div>
        </div>
        {/* Course Logo */}
        <div className="ml-[88px]">
          <Image
            src={courseData.logo}
            alt="Course Logo"
            width={215}
            height={215}
            className="w-[215px] h-[215px]"
          />
        </div> 
      </section>
      {/* Instructor and Students Section */}
      <div className="flex items-center -[20px]  mx-[90px]">
        <Image
          className="w-[60px] h-[60px] rounded-full  mr-4"
          src={courseData.instructor.image}
          alt="Instructor"
          width={60}
          height={60}
        />
        <div>
          <p className="font-bold text-[20px] text-lms-primary">
            {courseData.instructor.name}
          </p>
          <p className="text-lms-gray-80 text-[18px]">
            {courseData.instructor.title}
          </p>
        </div>
        {/* Student Images and Class Details */}
        <div className="flex items-center ml-[88px]">
          <div className="flex -space-x-6 items-center">
            {courseData.studentImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Student ${index + 1}`}
                width={40}
                height={40}
                className="h-[40px] w-[40px] rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <div className="flex items-center ml-2">
            <div className="mr-2 font-bold">
              {courseData.studentsJoined}
              <div className="text-lms-gray-80">Students Joined</div>
            </div>
          </div>

          <div className="mx-[100px] mt-5">
            <span className="text-lms-gray-80 font-bold">Class Start:</span>
            <span className="ml-2 font-bold ">{courseData.classStart}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
