import Link from "next/link";
import React, { useState } from "react";
import { Logout, MenuList } from "./instructorMenu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type MenuItem = {
  path: string;
  //   active: boolean;
  icon: any;
};

type Logout = {
  path: string;
  //   active: boolean;
  icon: any;
};

export default function InstructorSidebarComponent() {
  const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
  const [logout, setLogout] = useState<Logout[]>(Logout);
  const pathname = usePathname();
  return (
    <div className="h-full w-[72px] text-white flex flex-col bg-primary py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {menuList.map((item, index) => (
          // Link to the path of each sidebar item
          <Link key={index} href={item.path} passHref>
            {/* custom the style to overwrite default */}
            <Button
              // active={pathname === item.path}
              //group hover:bg-background to make it affect to inner element
              className={`group flex items-center justify-center p-4 hover:bg-white hover:text-primary ${
                pathname === item.path ? "bg-white text-primary" : ""
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-white group-hover:text-primary"
                }`}
              />
            </Button>
          </Link>
        ))}

        {logout.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              className={`group flex items-center justify-center p-4 hover:bg-white hover:text-primary ${
                pathname === item.path ? "bg-white text-primary" : ""
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-white group-hover:text-primary"
                }`}
              />
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
