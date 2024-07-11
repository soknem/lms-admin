"use client";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {ReactNode, useState, useEffect, Suspense} from "react";
import {inter, suwannaphum} from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import NavbarComponent from "@/components/instructorcomponent/navbar/NavbarComponent";
import InstructorSidebarComponent from "@/components/instructorcomponent/sidebar/InstructorSidebarComponents";
import {usePathname} from "next/navigation";
import PageLoading from "@/app/admin/(admin-dashboard)/PageLoading";


interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayoutParent({children}: RootLayoutProps) {
    const pathname = usePathname();
    // Check if the path includes a UUID
    const showInstructorSidebar = !pathname.match(/\/courses\/[^/]+/);

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
                <nav className="w-full h-[72px] shadow-md">
                    <NavbarComponent/>
                </nav>

                <section className="flex flex-grow h-[calc(100vh-72px)]">
                    {
                        showInstructorSidebar && (
                            <aside className="shadow-md">
                                <InstructorSidebarComponent/>
                            </aside>
                        )
                    }
                    <section className="flex-grow overflow-auto text-lms-black-90">
                        {children}
                    </section>
                </section>
            </ErrorBoundary>
        </StoreProvider>
        </body>
        </html>
    );
}
