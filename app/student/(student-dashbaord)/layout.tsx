"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import StudentSidebarComponent from "@/components/studentComponent/sidebar/StudentSidebarComponents";
import NavbarComponent from "@/components/adminComponent/navbar/NavbarComponent";
import { usePathname } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
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
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-background",
          fontSans.variable
        )}
      >
        <nav className="w-full h-[72px]">
          <NavbarComponent />
        </nav>
        <section className="flex flex-grow min-h-[calc(100vh-72px)]">
          <aside>
            {showStudentSidebar&& <StudentSidebarComponent/>} 
          </aside>
          <section className="w-full">{children}</section>
        </section>
      </body>
    </html>
  );
}
