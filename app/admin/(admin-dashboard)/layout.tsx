"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import NavbarComponent from "@/components/admincomponent/navbar/NavbarComponent";
import AdminSidebarComponent from "@/components/admincomponent/sidebar/AdminSidebarComponent";
import AcademicSidebar from "@/components/admincomponent/academics/sidebar/AcademicSidebarComponent";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayoutParent({ children }: RootLayoutProps) {


  const pathname = usePathname();
  const classDetailPattern = "/classes/"; // Update this with your actual dynamic route pattern
  const showSubAcademicSidebar = pathname.includes(classDetailPattern);

  const showAcademicSidebar =
    pathname.startsWith("/admin/academics") && !showSubAcademicSidebar;

  return (

    <html lang="en" suppressHydrationWarning>


      <body
        className={cn(
          "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
          fontSans.variable
        )}
      >


          <nav className="w-full h-[72px]">
            <NavbarComponent />
          </nav>

          
          <section className="flex flex-grow min-h-[calc(100vh-72px)]">


            <aside className="flex">
              <AdminSidebarComponent />
              {showAcademicSidebar && <AcademicSidebar />}
            </aside>


            <section className="flex-grow overflow-auto">
              {children}
            </section>

          </section>


      </body>


    </html>


  );
}
