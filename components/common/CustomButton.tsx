import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { className } from "postcss-selector-parser";

type props = {
  text: string;
  className?: string;
};

const CustomButton = ({ text, className }: props) => {
  return (
    <Button
      className={`${
        className || ""
      } rounded-[8px] hover:bg-gray-50 border-[#E6E6E6] bg-white ml-auto `}
    >
      {text}
    </Button>
  );
};

export default CustomButton;