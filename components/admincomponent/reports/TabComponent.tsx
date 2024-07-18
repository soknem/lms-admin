import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportComponent from "./student/ReportComponent";


export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="student">
        <TabsList>
          <div className="w-full flex items-end justify-end">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
            <TabsTrigger value="payment">Student payment</TabsTrigger>
            <TabsTrigger value="earning">Earning</TabsTrigger>{" "}
          </div>
        </TabsList>
        <TabsContent value="student">
          <ReportComponent />
        </TabsContent>

      </Tabs>
    </div>
  );
}
