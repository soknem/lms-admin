import AchievementTable from "@/components/studentcomponent/achievements/AchievementComponent";
import React from "react";
import { FaBook } from "react-icons/fa6";
const labelsTitle = [
  "Name (KH)",
  "Name (EN)",
  "Date of Birth",
  "Place of Birth",
  "Degree",
  "Major",
];

const labelsField = [
  "Chan Tida",
  "Chan Tida",
  "Jan 1, 2001",
  "Takeo Province, Cambodia",
  "Bachelor Degree",
  "Information Technology",
];

export default function Achievement() {
  return (
    <main className="flex flex-col h-full w-full p-9">
      {/* <h2 className="text-4xl text-lms-primary-color font-bold">Achievement</h2> */}
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

      {/* Transcript */}
      <section className="bg-white w-full flex flex-col items-center justify-center p-9 lg:mt-24 rounded-xl gap-9">
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-4xl text-center">
            Center of Science and Technology Advanced Development
          </h1>
          <p className="text-2xl font-semibold text-center">
            OFFICIAL TRANSCRIPT
          </p>
        </div>

        {/* Information */}
        <div className="flex w-full justify-between p-9">
          {/* student info */}
          <div className="flex flex-col gap-2 w-[500px] px-9">
            <div className="flex justify-start items-center w-full gap-6">
              <div className="flex flex-col gap-2">
                {labelsTitle.map((label, index) => (
                  <h2 key={index} className="text-xl">
                    {label}
                  </h2>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {labelsTitle.map((index) => (
                  <p key={index} className="text-xl">
                    :
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {labelsField.map((label, index) => (
                  <p key={index} className="text-xl">
                    {label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* student pic */}
          <div className="px-9">
            <img
              src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
              alt="student"
              className="w-[163px] h-[216px] object-cover"
            />
          </div>
        </div>

        {/* Table */}
        <AchievementTable />
      </section>
    </main>
  );
}
