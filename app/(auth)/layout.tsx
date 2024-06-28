"use client";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import {inter, suwannaphum} from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import {Toaster} from "@/components/ui/toaster";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayoutParent({children}: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-white",
                inter.variable, suwannaphum.variable
            )}
        >
        <StoreProvider>
            <ErrorBoundary errorComponent={Error}>

                <section className="absolute inset-0 "></section>
                <section className="relative w-full">
                    {children}
                    <Toaster/>
                </section>


            </ErrorBoundary>
        </StoreProvider>
        </body>
        </html>
    );
}
