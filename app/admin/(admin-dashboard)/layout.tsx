"use client";
import "@/app/globals.css";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { inter, suwannaphum } from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import NavbarComponent from "@/components/admincomponent/navbar/NavbarComponent";
import AdminSidebarComponent from "@/components/admincomponent/sidebar/AdminSidebarComponent";
import AcademicSidebar from "@/components/admincomponent/academics/sidebar/AcademicSidebarComponent";
import {MenuList} from "@/components/admincomponent/academics/sidebar/academicMenu";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayoutParent({ children }: RootLayoutProps) {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState(MenuList[0].path);
    const [isAcademicSidebarVisible, setAcademicSidebarVisible] = useState(false);

    const toggleAcademicSidebar = () => {
        setAcademicSidebarVisible((prev) => !prev);
    };

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
                inter.variable, suwannaphum.variable
            )}
        >
        <StoreProvider>
            <ErrorBoundary errorComponent={Error}>
                <nav className="w-full h-[72px] shadow-md">
                    <NavbarComponent />
                </nav>

                <section className="flex flex-grow h-[calc(100vh-72px)]">
                    <aside className="flex shadow-md">
                        <AdminSidebarComponent
                            toggleAcademicSidebar={toggleAcademicSidebar}
                            activePath={activePath}
                            setActivePath={setActivePath}
                        />
                        {isAcademicSidebarVisible && (
                            <AcademicSidebar
                                activePath={activePath}
                                setActivePath={setActivePath}
                            />
                        )}
                    </aside>

                    <section className="flex-grow overflow-auto text-lms-black-90">
                        {children}
                    </section>
                </section>
            </ErrorBoundary>
        </StoreProvider>
        </body>
        </html>
    );
}
