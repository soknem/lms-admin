import { CardCourseComponent } from "@/components/studentComponent/card/CardCourseComponent";
import React from "react";
import { FaBook } from "react-icons/fa6";

export default function Course() {
  return (
    <div className="flex flex-col h-full w-full p-9">
      {/* <h2 className="text-4xl text-primary font-bold">Course</h2> */}
      {/* student profile banner */}
      <section className="bg-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, Thida!
          </h2>
          <p className="text-lg text-slate-50">
            Passionate about literature and creative writing.
          </p>
        </div>
        <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-24">
          {/* image */}
          <div className="w-[150px] h-[150px] rounded-full shadow-lg">
            <img
              src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
              alt="student"
              className="h-full w-full object-cover rounded-full"
            />
          </div>

          {/* name and course*/}
          <div className="flex flex-col justify-end">
            <h3 className="text-3xl font-bold">Chan Tida</h3>
            <div className="flex items-center gap-3">
              <FaBook className="w-4 h-4 text-primary" />
              <p className="text-lg text-gray-800 font-semibold">8 Course</p>
            </div>
          </div>
        </section>
      </section>

      <section className="flex lg:hidden gap-9 py-8">
        {/* image */}
        <div className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full shadow-lg">
          <img
            src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
            alt="student"
            className="h-full w-full object-cover rounded-full"
          />
        </div>

        {/* name and course*/}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg lg:text-3xl font-bold">Chan Tida</h3>
          <div className="flex items-center gap-3">
            <FaBook className="w-4 h-4 text-primary" />
            <p className="text-sm text-gray-800 font-semibold">8 Course</p>
          </div>
        </div>
      </section>
    </div>
  );
}
