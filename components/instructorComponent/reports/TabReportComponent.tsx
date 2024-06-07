import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./payment/TableComponent";
import ReportComponent from "./payment/HeaderComponent";
import Tabledata from "./payment/Tabledata";
import Tabledata1 from "./teaching/Tabledata1";
import ReportComponent1 from "./teaching/HeaderComponent";
import HeaderComponent1 from "./teaching/HeaderComponent";
import HeaderComponent from "./payment/HeaderComponent";

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
