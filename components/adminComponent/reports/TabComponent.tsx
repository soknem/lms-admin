import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportComponent from "./student/ReportComponent";
import ReportInstructorComponent from "./instructor/ReportInstructorComponent";
import ReportStaffComponent from "./staff/ReportStaffComponent";

export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="">
        <TabsList>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <ReportComponent />
        </TabsContent>
        <TabsContent value="instructor">
          <ReportInstructorComponent/>
        </TabsContent>
        <TabsContent value="staff">
          <ReportStaffComponent/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
