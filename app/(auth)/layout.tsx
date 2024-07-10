"use client";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {ReactNode, Suspense} from "react";
import {inter, suwannaphum} from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import {Toaster} from "@/components/ui/toaster";

type RootLayoutProps = {
    children: ReactNode;
}

export default function RootLayoutParent({children}: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#333] dark:text-[#f5f5f5] ",
                inter.variable, suwannaphum.variable
            )}
        >
        <StoreProvider>
            <ErrorBoundary errorComponent={Error}>
                <Suspense fallback={<div>Loading...</div>}>


                    <section className="absolute inset-0 "></section>
                    <section className="relative w-full">
                        {children}
                        <Toaster/>
                    </section>


                </Suspense>


            </ErrorBoundary>
        </StoreProvider>
        </body>
        </html>
    );
}
