import { Button } from "@/components/ui/button";
import React from "react";
import { PiCertificateFill } from "react-icons/pi";
import {EditStuProForm} from "@/components/studentcomponent/setting/EditStuPro";

export default function Setting() {
  return (
    <main className="flex flex-col h-full w-full gap-9 p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Setting</h2>
      <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
        <EditStuProForm />
      </section>

      <div className="flex flex-col items-start w-full gap-2 ml-4">
        <p className="font-bold text-2xl">Documents</p>

        <div className="flex justify-start w-full gap-16">
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white border rounded-[10px] px-9">
            <PiCertificateFill className="w-[80px] h-[80px] text-lms-primary" />
            <p className="font-medium text-xl">Certificate</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end w-full">
        <Button className="text-sm font-bold p-4 bg-lms-primary text-white hover:bg-lms-primary rounded-[10px]">
          Update
        </Button>
      </div>
    </main>
  );
}
