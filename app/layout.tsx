import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";


import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { inter, suwannaphum } from "./font";
import { ThemeProvider } from "@/components/ui/themeProvider";

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-lms-background font-sans antialiased",
          inter.variable, suwannaphum.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >

          {children}
          
        </ThemeProvider>
      </body>
    </html>
  );
}
