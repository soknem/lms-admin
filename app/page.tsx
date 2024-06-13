"use client";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardLogin } from "@/components/card/cartAuth/CardLogin";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-center">
    //
    //   <h1>hello</h1>
    //   <div className="flex gap-4">
    //     <Button
    //       className=" border border-solid bg-red-200 rounded-xl hover:bg-fuchsia-100"
    //       onClick={() => router.push("/student/courses")}
    //     >
    //       Login as student
    //     </Button>
    //     <Button
    //       className=" border border-solid bg-red-200 rounded-xl hover:bg-fuchsia-100"
    //       onClick={() => router.push("/instructor/courses")}
    //     >
    //       Login as instuctor
    //     </Button>
    //     <Button
    //       className=" border border-solid bg-red-200 rounded-xl hover:bg-fuchsia-100"
    //       onClick={() => router.push("/admin/faculties")}
    //     >r
    //       Login as admin
    //     </Button>
    //   </div>
    //
    //
    // </main>
    <main className=" grid content-center h-[100vh] justify-center items-center ">
      <CardLogin />
    </main>
  );
}
