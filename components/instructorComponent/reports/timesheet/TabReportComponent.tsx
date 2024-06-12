import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teaching from "@/app/instructor/(instructor-dashboard)/reports/timesheet/teaching/page";
import Payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/page";

// import HeaderComponent1 from "@/components/instructorComponent/reports/timesheet/teaching/HeaderComponent";
// import HeaderComponent from "@/components/instructorComponent/reports/timesheet/payment/HeaderComponent";
// import Tabledata from "@/components/instructorComponent/reports/timesheet/payment/Tabledata";
// import Tabledata1 from "@/components/instructorComponent/reports/timesheet/teaching/Tabledata1";

export default function TabReportComponent() {
  return (
    <div>
      <Tabs defaultValue="payment">
        <TabsList>
          <TabsTrigger value="payment">Payment History</TabsTrigger>
          <TabsTrigger value="teaching">Teaching History</TabsTrigger>
        </TabsList>
        <TabsContent value="payment">
          <div className="bg-white">
            <Payment/>
          </div>
        </TabsContent>
        <TabsContent value="teaching">
          <div className="bg-white">
           <Teaching/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
