"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
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
  const showStudentSidebar = !pathname.includes("/coursedetail");
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className="flex none-scroll-bar overflow-x-auto bg-gray-300"> */}
      <body
        className={cn(
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
            inter.variable, suwannaphum.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <StoreProvider>
            <nav className="w-full h-[72px] shadow-md">
              <NavbarComponent/>
            </nav>
            <section className="flex flex-grow h-[calc(100vh-72px)]">
              <aside className=" shadow-md">
                {showStudentSidebar && <StudentSidebarComponent/>}
              </aside>
              <section className="flex-grow overflow-auto text-lms-black-90">{children}</section>
            </section>
          </StoreProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
