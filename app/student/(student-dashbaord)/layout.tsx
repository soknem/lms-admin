"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ui/themeProvider";
// @ts-ignore
import NavbarComponent from "@/components/studentcomponent/navbar/NavbarComponent";
// @ts-ignore
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
            <nav className="w-full h-[72px]">
              <NavbarComponent/>
            </nav>
            <section className="flex flex-grow min-h-[calc(100vh-72px)]">
              <aside>
                {showStudentSidebar && <StudentSidebarComponent/>}
              </aside>
              <section className="w-full">{children}</section>
            </section>
          </StoreProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
