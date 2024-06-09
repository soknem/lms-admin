import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportComponent from "./student/ReportComponent";
import ReportInstructorComponent from "./instructor/ReportInstructorComponent";
import ReportStaffComponent from "./staff/ReportStaffComponent";
import ReportAdmissionComponent from "./admission/ReportAdmissionComponent";
import StudentpayComponent from "./student's pay/Student'spayComponent";

export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="">
        <TabsList>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="payment">Student's payment</TabsTrigger>
          <TabsTrigger value="earning">Earning</TabsTrigger>


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
        <TabsContent value="admission">
          <ReportAdmissionComponent/>
        </TabsContent>
        <TabsContent value="payment">
          <StudentpayComponent/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
