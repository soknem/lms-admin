"use client";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {ReactNode, useState, useEffect} from "react";
import {inter, suwannaphum} from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import NavbarComponent from "@/components/admincomponent/navbar/NavbarComponent";
import AdminSidebarComponent from "@/components/admincomponent/sidebar/AdminSidebarComponent";

import {toast, Toaster, ToastBar} from 'react-hot-toast';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayoutParent({children}: RootLayoutProps) {

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
                <nav className="w-full h-[72px] shadow-md z-10">
                    <NavbarComponent/>
                </nav>

                <section className="flex flex-grow h-[calc(100vh-72px)]">
                    <aside className="flex">
                        <AdminSidebarComponent/>
                    </aside>

                    <section className="flex-grow overflow-auto text-lms-black-90">
                        {children}
                    </section>
                </section>
            </ErrorBoundary>
        </StoreProvider>
        {/*<Toaster>*/}
        {/*    {(t) => (*/}
        {/*        <ToastBar toast={t}>*/}
        {/*            {({ icon, message }) => (*/}
        {/*                <>*/}
        {/*                    {icon}*/}
        {/*                    {message}*/}
        {/*                    {t.type !== 'loading' && (*/}
        {/*                        <button onClick={() => toast.dismiss(t.id)}>X</button>*/}
        {/*                    )}*/}
        {/*                </>*/}
        {/*            )}*/}
        {/*        </ToastBar>*/}
        {/*    )}*/}
        {/*</Toaster>*/}
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
