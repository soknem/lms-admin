"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/ui/themeProvider";
import NavbarComponent from "@/components/instructorcomponent/navbar/NavbarComponent";
import InstructorSidebarComponent from "@/components/instructorcomponent/sidebar/InstructorSidebarComponents";
import { usePathname } from "next/navigation";
import ReportSidebar from "@/components/instructorcomponent/reports/sidebar/ReportSidebarComponent";
import StoreProvider from "@/app/StoreProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const showAcademicSidebar = pathname.startsWith("/instructor/reports");
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className="flex none-scroll-bar overflow-x-auto bg-gray-300"> */}
      <body
        className={cn(
          "min-h-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <StoreProvider>
            <nav className="w-full h-[72px]">
              <NavbarComponent/>
            </nav>
            <section className="flex flex-grow min-h-[calc(100vh-72px)]">
              <aside className="flex">
                <InstructorSidebarComponent/>
                {showAcademicSidebar && <ReportSidebar/>}
              </aside>
              <section className="flex-grow overflow-auto">{children}</section>
            </section>
          </StoreProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
