import React from "react";
import {FilterReport} from "@/components/admincomponent/reports/student/Filter";
import {ColumnDef} from "@tanstack/react-table";
import ReportComponent from "@/components/admincomponent/reports/student/ReportComponent";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ReportInstructorComponent from "@/components/admincomponent/reports/instructor/ReportInstructorComponent";
import ReportStaffComponent from "@/components/admincomponent/reports/staff/ReportStaffComponent";
import ReportAdmissionComponent from "@/components/admincomponent/reports/admission/ReportAdmissionComponent";
import StudentpayComponent from "@/components/admincomponent/reports/student's pay/Student'spayComponent";
import EarningsReportComponent from "@/components/admincomponent/reports/earning/EarningComponent";


const data: any[] = [
    // Your data here
];

const columns: ColumnDef<any, unknown>[] = [
    // Your columns definition here
];
export default async function Report() {
    return (
        <main className="p-9">
            <h2 className="text-4xl text-lms-primary font-bold mb-6">Reports</h2>

            <div>

                <div className="">
                    <Tabs defaultValue="student">
                        <div className="flex justify-between items-center mb-4">
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
                            <div >
                                <FilterReport columns={columns} data={data}/>
                            </div>
                        </div>

                        <TabsContent value="student">
                            <ReportComponent/>
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
                            {/*<div className="mt-4">*/}
                            {/*    <StudentpayComponent/>*/}
                            {/*</div>*/}
                        </TabsContent>
                        <TabsContent value="earning">
                            <EarningsReportComponent/>
                        </TabsContent>
                    </Tabs>

                </div>



            </div>
        </main>
    );
}
