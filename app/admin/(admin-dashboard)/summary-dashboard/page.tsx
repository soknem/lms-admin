'use client'
import React, {useEffect} from "react";
import DashboardCard from "@/components/admincomponent/summary-dashboard/DashboardCard";

export default  function Dashboard() {

    return (
        <section className="flex flex-col gap-4 h-full w-full p-9">
            <h1 className=' text-3xl font-bold text-lms-primary'>Summary Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>

            </div>



        </section>
    );
}