"use client"

import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateComponent() {
  const [month, setMonth] = React.useState<number>(new Date().getMonth())
  const [year, setYear] = React.useState<number>(new Date().getFullYear())

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(event.target.value))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          // variant={"outline"}
          className={cn(
            "w-[150px] h-[44px] bg-white  text-lms-primary text-[18px] hover:lms-gray30 font-medium"
          )}
        >
          {format(new Date(year, month), "MM / yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex space-x-4 mb-4">
          <select
            value={month}
            onChange={handleMonthChange}
            className="form-select px-2 py-1 border rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{format(new Date(0, i), "MMMM")}</option>
            ))}
          </select>
          <select
            value={year}
            onChange={handleYearChange}
            className="form-select px-2 py-1 border rounded"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={year - 5 + i}>{year - 5 + i}</option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  )
}


// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function DateComponent() {
//   const [month, setMonth] = React.useState<number>(new Date().getMonth());
//   const [year, setYear] = React.useState<number>(new Date().getFullYear());

//   const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setMonth(parseInt(event.target.value));
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setYear(parseInt(event.target.value));
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[150px] h-[44px] bg-white justify-start text-primary text-[18px] hover:bg-gray-200 font-medium"
//           )}
//         >
//           {format(new Date(year, month), "MM / yyyy")}
//         </Button>
//       </PopoverTrigger>
//     </Popover>
//   );
// }
