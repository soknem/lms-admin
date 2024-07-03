// components/FollowerCard.tsx
import React from 'react';
import { PiStudent } from "react-icons/pi";

const DashboardCard = () => {
    return (
        <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-xl font-medium text-lms-gray-80">Students</div>
                    </div>
                    <div className="text-lms-primary bg-lms-primary/10 p-2 rounded-full">
                        <PiStudent className="w-6 h-6"/>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-3xl font-bold text-gray-900">250</div>
                    <div className="flex space-x-6">
                        <div className=" text-based text-gray-500 mt-4">
                            <span className="text-lms-primary mr-2  px-2 bg-lms-primary/10 rounded-xl">Female</span>
                            <span className="text-lms-black-90 mr-2 font-semibold">120</span>
                        </div>
                        <div className="text-based text-gray-500 mt-4">
                            <span className="text-lms-accent mr-2  px-2 bg-lms-accent/10 rounded-xl">Male</span>
                            <span className="text-lms-black-90 mr-2 font-semibold">130</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
