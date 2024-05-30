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

  // handle academic sidebar
  const pathname = usePathname();
  const showAcademicSidebar = pathname.startsWith("/admin/academics");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-background",
          fontSans.variable
        )}
      >
        <nav className="w-full h-20">
          <NavbarComponent />
        </nav>
        <section className="flex">
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
