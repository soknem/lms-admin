import { Label } from "@/components/ui/label";
import React from "react";

export default function HeaderComponent() {
  return (
    <div className="rounded-[10px] p-4 bg-white">
      
      <div className="flex justify-between p-2">
        <div>
          <Label className="text-lms-gray30">Generation</Label>
          <p className="flex font-medium text-black">Generation 1</p>
        </div>
        <div>
          <Label className="text-lms-gray30">Year</Label>
          <p className="flex font-medium text-black">Foundation Year</p>
        </div>
        <div>
          <Label className="text-lms-gray30">Academic Year</Label>
          <p className="flex font-medium text-black">2024-2025</p>
        </div>
        <div>
          <Label className="text-lms-gray30">Study Program</Label>
          <p className="flex font-medium text-black">Information Technology</p>
        </div>
        <div>
          <Label className="text-lms-gray30">Course</Label>
          <p className="flex font-medium text-black">Web Design</p>
        </div>
        <div>
          <Label className="text-lms-gray30">Class</Label>
          <div className="flex gap-2">
            <p className="flex text-black font-medium">Istad-class2</p>
          </div>
          
        </div>
        <div>
          <Label className="text-lms-gray30">Duration</Label>
          <p className="flex font-medium text-black">01/02/2022-03/05/2023</p>
        </div>
      </div>
    </div>
  );
}
