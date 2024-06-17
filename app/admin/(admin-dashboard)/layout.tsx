"use client";
import "@/app/globals.css";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import AdminSidebarComponent from "@/components/admincomponent/sidebar/AdminSidebarComponent";
import AcademicSidebar from "@/components/admincomponent/academics/sidebar/AcademicSidebarComponent";
import { inter, suwannaphum } from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import NavbarComponent from "@/components/admincomponent/navbar/NavbarComponent";
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
            inter.variable, suwannaphum.variable
        )}
      >
      <StoreProvider>
          <ErrorBoundary errorComponent={Error}>
              <nav className="w-full h-[72px]">
                  <NavbarComponent/>
              </nav>

              <section className="flex flex-grow min-h-[calc(100vh-72px)]">
                  <aside className="flex">
                      <AdminSidebarComponent/>
                      {showAcademicSidebar && <AcademicSidebar/>}
                  </aside>

                  <section className="flex-grow overflow-auto text-lms-black-90  ">{children}</section>
              </section>
          </ErrorBoundary>

      </StoreProvider>

      </body>
    </html>
  );
}
