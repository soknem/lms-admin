import Link from "next/link";
import React, { useState } from "react";
import { Logout, MenuList } from "./instructorMenu";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

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

  const { theme, setTheme } = useTheme();
  const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
  const [logout, setLogout] = useState<Logout[]>(Logout);
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

   // Function to handle theme toggle
   const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };


  return (
    <div className="h-full w-[72px] text-white flex flex-col bg-lms-primary py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {menuList.map((item, index) => (
          // Link to the path of each sidebar item
          <Link key={index} href={item.path} passHref>
            {/* custom the style to overwrite default */}
            <Button
              // active={pathname === item.path}
              //group hover:bg-background to make it affect to inner element
              className={`group flex items-center justify-center p-4 rounded-[10px]  hover:bg-lms-background hover:text-lms-primary ${
                pathname === item.path
                  ? "bg-lms-background text-lms-primary"
                  : ""
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  pathname === item.path
                    ? "text-lms-primary"
                    : "text-white group-hover:text-lms-primary"
                }`}
              />
            </Button>
          </Link>
        ))}

        {/* Render theme switch button */}
        <Button
          onClick={handleThemeToggle}
          className={`group flex items-center rounded-[10px] justify-center p-4 hover:bg-white hover:text-lms-primary ${
            isDarkMode ? 'rounded-[10px] text-white ' : ''
          }`}
        >
          {isDarkMode ? <BsMoonStarsFill className="w-5 h-5 text-primary" /> : <BsSunFill className="w-5 h-5 text-white group-hover:text-primary" />}
        </Button>


        {logout.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              className={`group flex items-center justify-center p-4 hover:bg-lms-background hover:text-lms-primary ${
                pathname === item.path ? "bg-lms-background text-primary" : ""
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
