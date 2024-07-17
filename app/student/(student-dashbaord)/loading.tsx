import React from 'react';
import LoadingSVG from '@/public/loading.svg';

const LoadingComponent = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="100"
                 height="100"
                 style={{shapeRendering: 'auto', display: 'block', background: 'rgb(245, 245, 245)'}}
                 xmlnsXlink="http://www.w3.org/1999/xlink">
                <g>
                    <path style={{transform: 'scale(0.49)', transformOrigin: '50px 50px'}} strokeLinecap="round"
                          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                          strokeDasharray="212.9688104248047 43.62011779785155" strokeWidth="11" stroke="#243c94"
                          fill="none">
                        <animate values="0;256.58892822265625" keyTimes="0;1" dur="2.4390243902439024s"
                                 repeatCount="indefinite"
                                 attributeName="stroke-dashoffset"></animate>
                    </path>
                    <g></g>
                </g>
            </svg>
        </div>
    );
};

export default LoadingComponent;