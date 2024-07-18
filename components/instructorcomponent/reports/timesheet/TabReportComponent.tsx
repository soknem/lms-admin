import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teaching from "@/app/instructor/(instructor-dashboard)/reports/timesheet/teaching/page";
import { DateComponent } from "@/components/instructorcomponent/reports/timesheet/DateComponent";
import Payment from "@/app/instructor/(instructor-dashboard)/reports/timesheet/payment/page";

export default function TabReportComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState("payment");

    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between">
                    <div>
                        <DateComponent selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                    <TabsList>
                        <TabsTrigger className="rounded-[7px]" value="payment">
                            Payment History
                        </TabsTrigger>
                        <TabsTrigger className="rounded-[7px]" value="teaching">
                            Teaching History
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="payment">
                    <div className="bg-white">
                        <Payment selectedDate={selectedDate} />
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
