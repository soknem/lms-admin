import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logout, MenuList } from "./studentMenu";

type MenuItem = {
  path: string;
  icon: any;
};

type Logout = {
  path: string;
  icon: any;
};

export default function StudentSidebarComponent() {
  const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
  const [logout, setLogout] = useState<Logout[]>(Logout);
  const pathname = usePathname();
  return (
    <div className="h-full w-[72px] text-white flex flex-col bg-lms-primary py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {menuList.map((item, index) => (
          // Link to the path of each sidebar item
          <Link key={index} href={item.path} passHref>
            {/* custom the style to overwrite default */}
            <Button
              // group hover:bg-background to make it affect to inner element
              className={`group flex items-center justify-center p-4 rounded-[10px] hover:bg-lms-background hover:text-lms-primary ${
                pathname === item.path ? "bg-lms-background text-lms-primary" : ""
              }`}
            >
              <item.icon
                // set the color of icon based on the current path
                className={`w-5 h-5 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-white group-hover:text-lms-primary"
                }`}
              />
            </Button>
          </Link>
        ))}

        {logout.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              className={`group flex items-center justify-center p-4 rounded-[10px] hover:bg-lms-background hover:text-lms-primary ${
                pathname === item.path ? "bg-lms-background text-lms-primary" : ""
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-white group-hover:text-lms-primary"
                }`}
              />
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
