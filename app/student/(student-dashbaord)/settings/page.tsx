import {Button} from "@/components/ui/button";
import React from "react";
import {PiCertificateFill} from "react-icons/pi";
import {EditStuProForm} from "@/components/studentcomponent/setting/EditStuPro";

export default function Setting() {
    return (
        <main className="flex flex-col h-full w-full gap-9 p-9 relative">
            <h2 className="text-4xl text-lms-primary font-bold">Setting</h2>
            <section className="flex flex-grow  gap-6 p-6 bg-white rounded-[10px] justify-center items-center">
                <EditStuProForm/>
            </section>


        </main>
    );
}
