import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabComponent() {
  return (
    <div>
        <Tabs defaultValue="account" className="w-[315px] bg-white rounded-lg">
      <TabsList>
        <TabsTrigger value="account">Curriculum</TabsTrigger>
        <TabsTrigger value="password">Slide</TabsTrigger>
        <TabsTrigger value="password">Video</TabsTrigger>
        <TabsTrigger value="password">MiniProject</TabsTrigger>

      </TabsList>
      <TabsContent value="account">
      </TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
    </div>
  )
}
