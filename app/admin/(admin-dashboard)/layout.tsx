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
import {useGetProfileQuery} from "@/lib/features/userProfile/userProfile";
import {any} from "prop-types";
import {useDispatch} from "react-redux";
import {setUserProfile} from "@/lib/features/userProfile/userProfileSlice";
import UserProfileFetcher from "@/components/common/UserProfileFetcher";

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
                    <UserProfileFetcher>
                        <nav className="w-full h-[72px] shadow-md  top-0 sticky  ">
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
                    </UserProfileFetcher>
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
