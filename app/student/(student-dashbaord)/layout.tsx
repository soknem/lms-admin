"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import NavbarComponent from "@/components/studentcomponent/navbar/NavbarComponent";
import StudentSidebarComponent from "@/components/studentcomponent/sidebar/StudentSidebarComponents";

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
        <nav className="w-full h-20">
          <NavbarComponent />
        </nav>
        <section className="flex">
          <aside>
            <StudentSidebarComponent/>
          </aside>
          <section className="flex w-full">{children}</section>
        </section>
      </body>
    </html>
  );
}
