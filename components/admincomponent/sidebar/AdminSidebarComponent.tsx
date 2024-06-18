import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { MenuList, Logout } from "@/components/admincomponent/sidebar/adminMenu";
import { IconType } from "react-icons";

type MenuItem = {
    path: string;
    icon: any;
    title: string;
    subicon?: IconType;
};

type LogoutItem = {
    path: string;
    icon: any;
    title: string;
};

export default function AdminSidebarComponent({
                                                  toggleAcademicSidebar,
                                                  activePath,
                                                  setActivePath,
                                              }:any) {
    const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
    const [logout, setLogout] = useState<LogoutItem[]>(Logout);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    const buttonClass = (isActive: boolean) =>
        `group flex items-center justify-center p-4 rounded-[10px] hover:bg-lms-background hover:text-lms-primary ${
            isActive ? "bg-lms-background text-lms-primary" : ""
        }`;

    return (
        <div
            className={`h-full w-[72px] text-white hover:w-[240px] flex flex-col bg-lms-primary py-9 transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <nav className="flex flex-col items-center gap-2 justify-between">
                {menuList.map((item, index) => (
                    <Link key={index} href={item.path} passHref>
                        <Button
                            className={`${buttonClass(activePath.startsWith(item.path))} ${
                                isHovered ? "w-[200px] flex justify-start gap-4" : ""
                            }`}
                            onClick={() => setActivePath(item.path)}
                        >
                            <item.icon
                                className={`w-5 h-5 ${
                                    activePath === item.path
                                        ? "text-lms-primary"
                                        : "text-white group-hover:text-lms-primary"
                                }`}
                            />
                            {isHovered && (
                                <div className="flex items-center gap-9">
                  <span className="text-lg font-medium transition-opacity duration-300 opacity-100">
                    {item.title}
                  </span>
                                    {item.subicon && (
                                        <item.subicon
                                            className="w-5 h-5 transition-opacity duration-300 opacity-100"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleAcademicSidebar();
                                                setActivePath(item.path);
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </Button>
                    </Link>
                ))}

                <Button
                    onClick={handleThemeToggle}
                    className={`${buttonClass(false)} ${
                        isDarkMode ? "text-white" : ""
                    } ${isHovered ? "w-[200px] flex justify-start gap-4" : ""}`}
                    style={{ minWidth: "40px" }}
                >
                    {isDarkMode ? (
                        <>
                            <BsMoonStarsFill className="w-5 h-5 text-primary" />
                            {isHovered && <span className="text-lg font-medium">Light Mode</span>}
                        </>
                    ) : (
                        <>
                            <BsSunFill className="w-5 h-5 text-white group-hover:text-lms-primary" />
                            {isHovered && <span className="text-lg font-medium">Dark Mode</span>}
                        </>
                    )}
                </Button>

                {logout.map((item, index) => (
                    <Link key={index} href={item.path} passHref>
                        <Button
                            className={`${buttonClass(activePath.startsWith(item.path))} ${
                                isHovered ? "w-[200px] flex justify-start gap-4" : ""
                            }`}
                        >
                            <item.icon
                                className={`w-5 h-5 ${
                                    activePath === item.path
                                        ? "text-primary"
                                        : "text-white group-hover:text-lms-primary"
                                }`}
                            />
                            {isHovered && (
                                <span className="text-lg font-medium transition-opacity duration-300 opacity-100">
                  {item.title}
                </span>
                            )}
                        </Button>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
