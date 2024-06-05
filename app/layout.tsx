import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { inter, suwannaphum } from "./font";

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable, suwannaphum.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
  