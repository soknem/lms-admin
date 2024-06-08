import React from 'react'

import { Badge } from "@/components/ui/badge"

const StatusBadge = ({ type , status  } : any ) => {
    const getTypeStatus = (type : any) => {
      switch (type) {
        case 'success':
          return 'bg-green-200 text-[#548164] hover:bg-green-200';
        case 'warning':
          return 'bg-yellow-100 text-[#C29343] hover:bg-yellow-100';
        case 'error':
          return 'bg-red-500 text-white';
        default:
          return 'bg-gray-200 text-gray-500';
      }
    };
  
    return (
      <Badge className={`py-1 px-3 rounded-lg font-semibold  ${getTypeStatus(type)}`}>
        {status}
      </Badge>
    );
  };
  
  export default StatusBadge;
