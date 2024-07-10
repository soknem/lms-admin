"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ui/themeProvider";
import NavbarComponent from "@/components/studentcomponent/navbar/NavbarComponent";
import StudentSidebarComponent from "@/components/studentcomponent/sidebar/StudentSidebarComponents";
import StoreProvider from "@/app/StoreProvider";
import { inter, suwannaphum } from "@/app/font";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const pathname = usePathname();

    // Check if the path includes a UUID
    const showStudentSidebar = !pathname.match(/\/courses\/[^/]+/);

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
                inter.variable, suwannaphum.variable
            )}
        >
        <ThemeProvider attribute="class" defaultTheme="system">
            <StoreProvider>
                <nav className="w-full h-[72px] shadow-md">
                    <NavbarComponent />
                </nav>
                <section className="flex flex-grow h-[calc(100vh-72px)]">
                    {showStudentSidebar && (
                        <aside className="shadow-md">
                            <StudentSidebarComponent />
                        </aside>
                    )}
                    <section className="flex-grow overflow-auto text-lms-black-90">
                        {children}
                    </section>
                </section>
            </StoreProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
