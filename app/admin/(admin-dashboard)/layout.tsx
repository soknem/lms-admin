"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import AdminSidebarComponent from "@/components/adminComponent/sidebar/AdminSidebarComponent";
import AcademicSidebar from "@/components/adminComponent/academics/sidebar/AcademicSidebarComponent";
import NavbarComponent from "@/components/adminComponent/navbar/NavbarComponent";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayoutParent({ children }: RootLayoutProps) {

  // handle academic sidebar
  const pathname = usePathname();
  const showAcademicSidebar = pathname.startsWith("/admin/academics");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-background",
          fontSans.variable
        )}
      >
        <nav className="w-full flex flex-grow h-20">
        <nav className="w-full h-[72px]">
          <NavbarComponent />
        </nav>
        <section className="flex flex-grow h-[calc(100vh-72px)]">
          <aside className="flex">
            <AdminSidebarComponent />
            {showAcademicSidebar && <AcademicSidebar />}
          </aside>
          <section className="w-full">{children}</section>
        </section>
      </body>
    </html>
  );
}
