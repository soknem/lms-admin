import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teaching from "@/app/instructor/(instructor-dashboard)/reports/(timesheet)/teaching/page";
import Payment from "@/app/instructor/(instructor-dashboard)/reports/(timesheet)/payment/page";

export default function TabReportComponent() {
  return (
    <div>
      <Tabs defaultValue="payment">
        <div className="w-full flex items-end justify-end">
          <TabsList>
            <TabsTrigger value="payment">Payment History</TabsTrigger>
            <TabsTrigger value="teaching">Teaching History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="payment">
          <div className="bg-white">
            <Payment />
          </div>
        </TabsContent>
        <TabsContent value="teaching">
          <div className="bg-white">
            <Teaching />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
