import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function TabReportComponent() {
  return (
    <div>
      <Tabs defaultValue="curriculum">
        <TabsList>
          <TabsTrigger value="payment history">Payment History</TabsTrigger>
          <TabsTrigger value="teaching history">Teaching History</TabsTrigger>
         
        </TabsList>
        <TabsContent value="payment history">
        </TabsContent>
        <TabsContent value="teaching history">
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
