import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { inter, suwannaphum } from "@/app/font";
import StoreProvider from "@/app/StoreProvider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayoutParent({ children}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen min-w-screen flex flex-col overflow-x-auto bg-background",
            inter.variable, suwannaphum.variable
        )}
      >
      <StoreProvider>
          <ErrorBoundary errorComponent={Error}>
              <section
                  className="relative flex flex-grow min-h-[calc(100vh)] bg-cover bg-center"
                  style={{backgroundImage: "url('/loginImage.jpg')"}}
              >
                  <section className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></section>
                  <section className="relative w-full">
                      {children}
                      <Toaster/>
                  </section>
              </section>
          </ErrorBoundary>
      </StoreProvider>

      </body>
    </html>
  );
}
