import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MenuList, Logout } from './adminMenu';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

// Define types for menu items and logout button
type MenuItem = {
  path: string;
  icon: any;
};

type LogoutItem = {
  path: string;
  icon: any;
};

export default function AdminSidebarComponent() {

  // State variables for menu items, logout button, and theme
  const [menuList] = useState<MenuItem[]>(MenuList);
  const [logout] = useState<LogoutItem[]>(Logout);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);


  // Check if theme is dark
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);



  // Function to handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };




  return (
    <div className="h-full w-[72px] text-white flex flex-col bg-lms-primary py-9 ">
      <nav className="flex flex-col items-center gap-2 justify-between">
        {/* Render menu items */}
        {menuList.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              className={`group flex items-center rounded-[10px] justify-center p-4 hover:bg-white hover:text-lms-primary ${
                pathname.startsWith(item.path) ? 'bg-white rounded-[10px] text-lms-primary' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                pathname.startsWith(item.path) ? 'text-primary' : 'text-white group-hover:text-primary'
              }`} />
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


        

        {/* Render logout button */}
        {logout.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <Button
              className={`group flex items-center rounded-[10px] justify-center p-4 hover:bg-white hover:text-lms-primary ${
                pathname.startsWith(item.path) ? 'bg-white rounded-[10px] text-lms-primary' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                pathname.startsWith(item.path) ? 'text-primary' : 'text-white group-hover:text-primary'
              }`} />
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
