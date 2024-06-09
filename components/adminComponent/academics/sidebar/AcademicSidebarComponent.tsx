import Link from "next/link";
import React, { useState } from "react";
// @ts-ignore
import { MenuList } from "./academicMenu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type MenuItem = {
  path: string;
  name: string;
};

export default function AcademicSidebar() {
  const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
  const pathname = usePathname();
  return (
    <div className="h-full w-[270px] flex flex-col bg-white py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {menuList.map((item, index) => (
          // Link to the path of each sidebar item
          <Link key={index} href={item.path} passHref>
            {/* custom the style to overwrite default */}
            <Button
              // group hover:bg-background to make it affect to inner element
              className={` text-lg text-lms-gray80 font-medium  flex items-center justify-start px-9 w-[240px] bg-white hover:bg-lms-background" ${
                pathname === item.path ? "bg-lms-background text-lms-primary rounded-[10px]" : ""
              }`}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
