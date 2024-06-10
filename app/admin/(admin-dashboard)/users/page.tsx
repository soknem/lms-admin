import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Users() {
  return (
    <main className="flex flex-col h-fullw-full p-9">
      <h1 className=" text-3xl font-bold text-lms-primary">Users</h1>
      <div>
        <Tabs defaultValue="student" className="w-full my-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value="student"></TabsContent>

          <TabsContent value="staff"></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
