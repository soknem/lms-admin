import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import ReportComponent from "./student/ReportComponent";
// @ts-ignore
import ReportInstructorComponent from "./instructor/ReportInstructorComponent";
// @ts-ignore
import ReportStaffComponent from "./staff/ReportStaffComponent";
// @ts-ignore
import ReportAdmissionComponent from "./admission/ReportAdmissionComponent";
// @ts-ignore
import StudentpayComponent from "./student's pay/Student'spayComponent";
import StudentpayComponent2 from "./student's pay/Student'spayComponent copy";
import EarningsReportComponent from "./earning/EarningComponent";

export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="student">
        <TabsList>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="admission">Admission</TabsTrigger>
          <TabsTrigger value="payment">Student payment</TabsTrigger>
          <TabsTrigger value="earning">Earning</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <ReportComponent />
        </TabsContent>
        <TabsContent value="instructor">
          <ReportInstructorComponent />
        </TabsContent>
        <TabsContent value="staff">
          <ReportStaffComponent />
        </TabsContent>
        <TabsContent value="admission">
          <ReportAdmissionComponent />
        </TabsContent>
        <TabsContent value="payment">
          <StudentpayComponent />
          <div className="mt-4">
            <StudentpayComponent2 />
          </div>
        </TabsContent>
        <TabsContent value="earning">
          <EarningsReportComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
