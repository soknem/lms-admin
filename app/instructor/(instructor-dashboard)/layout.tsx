"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import NavbarComponent from "@/components/instructorcomponent/navbar/NavbarComponent";
import InstructorSidebarComponent from "@/components/instructorcomponent/sidebar/InstructorSidebarComponents";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className="flex none-scroll-bar overflow-x-auto bg-gray-300"> */}
      <body
        className={cn(
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
          fontSans.variable
        )}
      >
        <nav className="w-full h-[72px]">
          <NavbarComponent />
        </nav>
        <section className="flex flex-grow min-h-[calc(100vh-72px)]">
          <aside>
          <InstructorSidebarComponent/>
          </aside>
          <section className="w-full">{children}</section>
        </section>
      </body>
    </html>
  );
}
