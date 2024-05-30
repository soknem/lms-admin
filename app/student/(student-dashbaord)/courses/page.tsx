import { CardCourseComponent } from "@/components/studentComponent/card/CardCourseComponent";
import React from "react";

export default function Course() {
  return <div className="flex flex-col h-full w-full p-9">
    <h2 className="text-4xl text-primary font-bold">Course</h2>
    <CardCourseComponent/>
  </div>;
}
