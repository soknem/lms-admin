import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacultiesTable } from "./FacultiesTableComponent";

type TabsTitle = "faculty" | "degree" | "study-program" | "subject";
const tabs: TabsTitle[] = ["faculty", "degree", "study-program", "subject"];

export function TabsDemo() {
  return (
    // <Tabs defaultValue="account" className="w-[400px]">
    //   <TabsList className="grid w-full grid-cols-2">
    //     <TabsTrigger value="account">Account</TabsTrigger>
    //     <TabsTrigger value="password">Password</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="account">

    //   </TabsContent>
    //   <TabsContent value="password">

    //   </TabsContent>
    // </Tabs>
    <Tabs defaultValue="faculty" className="w-full">
      <TabsList>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
        <TabsTrigger value="degree">Degree</TabsTrigger>
        <TabsTrigger value="study-program">Study Program</TabsTrigger>
        <TabsTrigger value="subject">Subject</TabsTrigger>
      </TabsList>
      <TabsContent value="faculty">
        <FacultiesTable/>
      </TabsContent>
      <TabsContent value="degree">Change your password here.</TabsContent>
    </Tabs>
  );
}
