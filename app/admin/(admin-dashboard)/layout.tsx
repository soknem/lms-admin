"use client";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {ReactNode, useState, useEffect, Suspense} from "react";
import {inter, suwannaphum} from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import NavbarComponent from "@/components/admincomponent/navbar/NavbarComponent";
import AdminSidebarComponent from "@/components/admincomponent/sidebar/AdminSidebarComponent";

import {toast, Toaster, ToastBar} from 'react-hot-toast';
import PageLoading from "@/app/admin/(admin-dashboard)/PageLoading";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayoutParent({children}: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-lms-background ",
                inter.variable, suwannaphum.variable
            )}
        >
        <StoreProvider>
            <ErrorBoundary errorComponent={Error}>
                <Suspense fallback={<PageLoading />}>
                <nav className="w-full h-[72px] shadow-md z-10 top-0 sticky  ">
                    <NavbarComponent/>
                </nav>

                <section className="flex flex-grow overflow-hidden">
                    <aside className="flex">
                        <AdminSidebarComponent/>
                    </aside>

                    <section className="flex-grow overflow-auto none-scroll-bar text-lms-black-90 ">
                        {children}
                    </section>
                </section>
                </Suspense>
            </ErrorBoundary>
        </StoreProvider>
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 5000, // Set the default duration to 5 seconds
                style: {
                    marginBottom: '20px',
                },
            }}
        />
        </body>
        </html>
    );
}
