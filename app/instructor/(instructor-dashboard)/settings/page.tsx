import { EditInsProForm } from "@/components/instructorcomponent/setting/EditInsPro";
import { Button } from "@/components/ui/button";
import React from "react";
import { PiCertificateFill } from "react-icons/pi";
export default function Setting() {
  return (
    <main className="flex flex-col h-full w-full gap-9 p-9">
      <h2 className="text-4xl text-lms-primary font-bold">Setting</h2>
      <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
        <EditInsProForm />
      </section>

    </main>
  );
}
