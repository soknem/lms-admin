import { TabsDemo } from "@/components/admincomponent/faculties/FacultiesTabsComponent";
import React from "react";

export default function Faculties() {
  return (
    <main className="flex flex-col gap-4 h-full w-full p-9">
      <h2 className="text-4xl text-primary font-bold">Faculties</h2>
      <TabsDemo />
    </main>
  );
}