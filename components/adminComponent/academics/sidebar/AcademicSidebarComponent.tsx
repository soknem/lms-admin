import Link from "next/link";
import React, { useState } from "react";
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
    <div className=" w-[270px] text-white flex flex-col bg-white py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {menuList.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              // active={pathname === item.path}
              className={`group flex items-center justify-center p-4 ${
                pathname === item.path ? "bg-background text-primary" : ""
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
