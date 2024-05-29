"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import SideBarComponent from "@/components/adminComponent/sidebar/SidebarComponents";
import NavbarComponent from "@/components/adminComponent/navbar/NavbarComponent";

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
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-background",
          fontSans.variable
        )}
      >
        <nav className="sticky h-20">
          <NavbarComponent />
        </nav>
        <main className="flex flex-grow">
          <aside className="left-0 z-10">
            <SideBarComponent />
          </aside>
          <section className="flex w-full">{children}</section>
        </main>
      </body>
    </html>
  );
}
