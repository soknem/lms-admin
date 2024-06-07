import { Label } from "@/components/ui/label";
import React from "react";

export default function HeaderComponent() {
  return (
    <div className="rounded-[10px] p-4">
      <p className="text-black_80 font-bold ml-4 mb-4">
        FY2025 - A1 Introduction to IT
        <span className="text-success">( Paid )</span>
      </p>
      <div className="flex justify-between p-4">
        <div>
          <Label className="text-gray-30">Generation</Label>
          <p className="flex font-medium text-black">Generation 1</p>
        </div>
        <div>
          <Label className="text-gray-30">Year</Label>
          <p className="flex font-medium text-black">Foundation Year</p>
        </div>
        <div>
          <Label className="text-gray-30">Academic Year</Label>
          <p className="flex font-medium text-black">2024-2025</p>
        </div>
        <div>
          <Label className="text-gray-30">Degree</Label>
          <p className="flex font-medium text-black">Bachelor</p>
        </div>
        <div>
          <Label className="text-gray-30">Department</Label>
          <p className="flex font-medium text-black">IT</p>
        </div>
        <div>
          <Label className="text-gray-30">Major</Label>
          <div className="flex gap-2">
            <p className="flex text-black font-medium">Information Techology</p>
          </div>
        </div>
      </div>
    </div>
  );
}
