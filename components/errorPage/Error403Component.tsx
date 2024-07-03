import React from 'react';
import {motion} from 'framer-motion';
import Image from "next/image";

const Error404: React.FC = () => {
    const courseData = {
        logo: "/errorpage400.png"

    };
    return (
        <div className="">
            <div className="flex between items-center justify-center">
                <Image
                    src={courseData.logo}
                    alt="Course Logo"
                    width={500}
                    height={500}
                    className="w-[600px] h-[600px]"
                />
            </div>
        </div>
    );
};

export default Error404;
