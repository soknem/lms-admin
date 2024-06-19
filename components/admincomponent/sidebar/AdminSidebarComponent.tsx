import React, {useState, useEffect} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {BsMoonStarsFill, BsSunFill} from "react-icons/bs";
import {MenuList, Logout} from "@/components/admincomponent/sidebar/adminMenu";
import {IconType} from "react-icons";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

type MenuItem = {
    path: string;
    icon: IconType;
    title: string;
    active: boolean;
    children?: { path: string; name: string }[];
};

type LogoutItem = {
    path: string;
    icon: IconType;
    title: string;
};

export default function InstructorSidebarComponent({
                                                       activePath,
                                                       setActivePath,
                                                   }: any) {
    const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
    const [logout, setLogout] = useState<LogoutItem[]>(Logout);
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const router = useRouter()

    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
    };


    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const buttonClass = (isActive: boolean) =>
        `group flex items-center justify-center p-4 rounded-[10px] hover:bg-lms-background hover:text-lms-primary ${
            isActive ? "bg-lms-background text-lms-primary" : ""
        }`;


    const commonButtonStyles = isSidebarOpen ? "w-[200px] flex justify-start gap-4" : " w-[52px] flex justify-center gap-4";

    const handleLogout = () => {
        fetch(`${process.env.NEXT_PUBLIC_LMS_URL}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from logout: ", data);
                router.push("/login");
            }).catch((error) => {
            console.error("Error:", error);
            alert("LogOut Failed");
        });
    }

    return (
        <div
            className={`h-full text-white transition-all duration-300  ${isSidebarOpen ? "w-[240px]" : "w-[72px]"} flex flex-col bg-lms-primary px-2 py-6`}>
            <div className="flex justify-between items-center p-4  mb-4 border-b">
                <span className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-medium`}>Admin Menu</span>
                <button onClick={handleSidebarToggle} className="text-white">
                    {isSidebarOpen ? <FiChevronLeft className="w-6 h-6"/> : <FiChevronRight className="w-6 h-6"/>}
                </button>
            </div>

            <nav className="flex flex-col items-center gap-2 justify-between">
                {menuList.map((item, index) => (
                        <div key={index} className="w-[full]">
                            {item.children ? (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value={item.path} className={`border-b-0`}>
                                        {isSidebarOpen ? (
                                            <AccordionTrigger
                                                className={` ${commonButtonStyles} h-[40px] flex p-4 hover:no-underline `}

                                            >
                                                <>
                                                    <item.icon style={{transform: 'rotate(0deg)'}}
                                                               className="w-5 h-5 rotate-0"/>
                                                    <span
                                                        className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium`}>{item.title}</span>
                                                </>

                                            </AccordionTrigger>
                                        ) : (
                                            <Button
                                                className={`${buttonClass} ${commonButtonStyles}`}
                                                onClick={() => {
                                                    setIsSidebarOpen(true);

                                                }}
                                                // onClick={() => handleAccordionItemClick(item.path)}
                                            >
                                                <item.icon className="w-5 h-5"/>
                                                <span
                                                    className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium`}>{item.title}</span>
                                            </Button>
                                        )}
                                        {isSidebarOpen && (
                                            <AccordionContent className={`pb-0 flex flex-col justify-center items-end  gap-2`}>
                                                {item.children.map((childItem, childIndex) => (
                                                    <Link key={childIndex} href={childItem.path} passHref>
                                                        <Button
                                                            className={` ${buttonClass(pathname === childItem.path)} ${isSidebarOpen ? "w-[180px] flex justify-start gap-4" : ""}`}>
                                                            <span
                                                                className="pl-4 text-lg font-medium">{childItem.name}</span>
                                                        </Button>
                                                    </Link>
                                                ))}
                                            </AccordionContent>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            ) : (
                                <Link key={index} href={item.path} passHref>
                                    <Button
                                        className={`${buttonClass(pathname.startsWith(item.path))} ${commonButtonStyles}`}
                                        // onClick={() => setActivePath(item.path)}
                                    >
                                        <item.icon className="w-5 h-5"/>
                                        <span
                                            className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium`}>{item.title}</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )
                )}

                <Button
                    onClick={handleThemeToggle}
                    className={`${buttonClass(false)} ${commonButtonStyles} ${isDarkMode ? "text-white" : ""}`}
                >
                    {isDarkMode ? (
                        <>
                            <BsMoonStarsFill className="w-5 h-5 text-primary"/>
                            <span
                                className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium`}>Light Mode</span>
                        </>
                    ) : (
                        <>
                            <BsSunFill className="w-5 h-5 text-white group-hover:text-lms-primary"/>
                            <span
                                className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium`}>Dark Mode</span>
                        </>
                    )}
                </Button>

                {
                    logout.map((item, index) => (
                        <Link key={index} href={item.path} passHref>
                            <Button onClick={handleLogout} className={`${buttonClass(activePath === item.path)} ${commonButtonStyles}`}  >
                                <item.icon className="w-5 h-5"/>
                                <span
                                    className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-medium transition-opacity duration-300 opacity-100`}>
                {item.title}
              </span>
                            </Button>
                        </Link>
                    ))
                }
            </nav>
        </div>
    );
}