// components/FollowerCard.tsx
import React from 'react';
import { PiStudent } from "react-icons/pi";
import { IconType } from 'react-icons';

type props = {
    total: number;
    label: string;
    Icon?: IconType;
    value1: string;
    value2: string;
    subLabel1: string;
    subLabel2: string;
}

const DashboardCard = ({total, label, Icon,value2,value1 , subLabel2,subLabel1 }: props) => {
    return (
        <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
            <div className="p-4">
                <div className="flex items-center justify-between">


                    <div className="flex items-center">
                        <div className="text-3xl font-bold text-gray-900">{total}</div>

                    </div>
                    <div className="text-lms-primary bg-lms-primary/10 p-2 rounded-full">
                        {/*<PiStudent className="w-6 h-6"/>*/}
                        {Icon && <Icon className="w-6 h-6"/>}
                    </div>

                </div>
                <div className="mt-2">

                    <div className="text-xl font-medium text-lms-gray-80 ">{label}</div>
                    <div className="flex space-x-6">
                        <div className=" text-xs text-gray-500 mt-4 ">
                            <span
                                className="text-lms-primary mr-2  py-1 px-2  border border-lms-primary rounded-xl font-semibold">{subLabel1}</span>
                            <span className="text-lms-black-90 mr-2 font-semibold text-[18px]">{value1}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-4">
                            <span
                                className="text-[#C29343] mr-2  py-1 px-2 border border-lms-accent rounded-xl  font-semibold">{subLabel2}</span>
                            <span className="text-lms-black-90 mr-2 font-semibold text-[18px]">{value2}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
