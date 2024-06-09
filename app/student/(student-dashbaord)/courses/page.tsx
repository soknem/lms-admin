"use client";
import { Button } from "@/components/ui/button";
import { CardCourseComponent } from "@/components/studentcomponent/courses/card/CardCourseComponent";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TbFilter } from "react-icons/tb";

export default function Course() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex flex-col h-full w-full p-9 gap-4">
      {/* <h2 className="text-4xl text-lms-primary-color font-bold">Course</h2> */}
      {/* student profile banner */}
      <section className="bg-lms-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
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
              <FaBook className="w-4 h-4 text-lms-primary" />
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
        <div className="flex flex-col justify-center ">
          <h3 className="text-lg lg:text-3xl font-bold">Chan Tida</h3>
          <div className="flex items-center gap-3">
            <FaBook className="w-4 h-4 text-lms-primary" />
            <p className="text-sm text-gray-800 font-semibold">8 Course</p>
          </div>
        </div>
      </section>

      {/* search course */}
      <section className="mt-24 flex items-center  flex-col gap-4 justify-between ">
        <div className="flex items-start py-4 w-[65%] gap-4">
          <div className="flex items-start w-full relative">
            <Input
              placeholder="Search Student"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="border-[#E6E6E6] bg-white focus:pl-8 "
            />
            {isFocused && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-center bg-white text-gray-30"
              >
                <TbFilter className="mr-2 h-4 w-4" />
                Filter By Semester
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
          <CardCourseComponent />
          <CardCourseComponent />
          <CardCourseComponent />
          <CardCourseComponent />
        </div>
      </section>
    </div>
  );
}
