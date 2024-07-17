import React from 'react';
import Image from "next/image";

const Error404: React.FC = () => {
    const courseData = {
        // logo: "/errorpage400.png",
        gif: "/404 Error Page.png" // Add the path to your GIF file
    };

    return (
        <div className="">
            <div className="flex between items-center justify-center mt-4">
                <Image
                    src={courseData.gif}
                    alt="Error GIF"
                    width={500}
                    height={500}
                    className="w-[500px] h-[500px]"
                />
            </div>
        </div>
    );
};

export default Error404;
