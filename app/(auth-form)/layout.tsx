import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayoutParent({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen min-w-screen flex flex-col none-scroll-bar overflow-x-auto bg-background",
          fontSans.variable
        )}
      >
        <section className="relative flex flex-grow min-h-[calc(100vh)] bg-cover bg-center" style={{ backgroundImage: "url('/FormImage.jpg')" }}>
          <div className="absolute inset-0 bg-black/1 backdrop-blur-[3px] "></div>
          <section className="relative w-full">
            {children}
            <Toaster />
          </section>
        </section>
      </body>
    </html>
  );
}
