import React from 'react';
import Image from "next/image";
import courseData from '@/components/studentComponent/coursedetail-header/CourseData'; // Adjust the path as needed

export default function CourseDetail() {
  return (
    <main>
      <div className="flex items-center justify-between mb-4 ml-24">
        <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
          {courseData.semester}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-primary ml-24">
            {courseData.title}
          </h2>
          <div className="text-gray-700 ml-24">
            {courseData.description}
            <div className="flex items-center mt-4">
              <span className="mr-4 font-semibold">Credit: {courseData.credits.total}</span>
              <span className="mr-4 font-semibold">| Theory: {courseData.credits.theory}</span>
              <span className="mr-4 font-semibold">| Practice: {courseData.credits.practice}</span>
            </div>
            <div className="flex items-center mt-4">
              <Image
                className="w-10 h-10 rounded-full mr-4"
                src={courseData.instructor.image}
                alt="Instructor"
                width={60}
                height={60}
              />
              <div>
                <p className="font-bold text-primary">{courseData.instructor.name}</p>
                <p className="text-gray-600">{courseData.instructor.title}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center">
              <div className="flex -space-x-4 overflow-hidden">
                {courseData.studentImages.map((src, index) => (
                  <Image
                    key={index}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={src}
                    alt={`Student ${index + 1}`}
                    width={32}
                    height={32}
                  />
                ))}
              </div>
              <span className="ml-3 text-gray-700">{courseData.studentsJoined}</span>
              <span className="ml-3 text-gray-700">Students Joined</span>
            </div>
            <span className="ml-20 text-gray-600">Class Start:</span>
            <span className="ml-2 text-gray-600 font-semibold">{courseData.classStart}</span>
          </div>
        </div>

        <div className="mr-36">
          <Image
            src={courseData.logo}
            alt="Flutter Logo"
            width={300}
            height={215}
          />
        </div>
      </div>
    </main>
  );
}
