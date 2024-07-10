// components/FollowerCard.tsx
import React from 'react';
import { PiStudent } from "react-icons/pi";
import { IconType } from 'react-icons';

type props = {
    total: number;
    label: string;
    Icon?: IconType;

}

const DashboardSingleCard = ({total, label, Icon}: props) => {
    return (
        <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-2xl font-medium text-lms-gray-80">{label}</div>
                    </div>
                    <div className="text-lms-primary bg-lms-primary/10 p-2 rounded-full">
                        {/*<PiStudent className="w-6 h-6"/>*/}
                        {Icon && <Icon className="w-6 h-6" />}
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-3xl font-bold text-gray-900">{total}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSingleCard;
