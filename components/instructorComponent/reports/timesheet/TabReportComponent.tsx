import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import HeaderComponent from "./payment/HeaderComponent";
// @ts-ignore
import Tabledata from "./payment/Tabledata";
// @ts-ignore
import HeaderComponent1 from "./teaching/HeaderComponent";
// @ts-ignore
import Tabledata1 from "./teaching/Tabledata1";

// import HeaderComponent1 from "@/components/instructorComponent/reports/timesheet/teaching/HeaderComponent";
// import HeaderComponent from "@/components/instructorComponent/reports/timesheet/payment/HeaderComponent";
// import Tabledata from "@/components/instructorComponent/reports/timesheet/payment/Tabledata";
// import Tabledata1 from "@/components/instructorComponent/reports/timesheet/teaching/Tabledata1";

export default function TabReportComponent() {
  return (
    <div>
      <Tabs defaultValue="  ">
        <TabsList>
          <TabsTrigger value="payment history">Payment History</TabsTrigger>
          <TabsTrigger value="teaching history">Teaching History</TabsTrigger>
        </TabsList>
        <TabsContent value="payment history">
          <div className="bg-white">
            <HeaderComponent />
            <Tabledata />
          </div>
        </TabsContent>
        <TabsContent value="teaching history">
          <div className="bg-white">
            <HeaderComponent1 />
            <Tabledata1 />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
