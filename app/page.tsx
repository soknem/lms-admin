import Image from "next/image";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
     <h1>hello</h1> 
     <Button className=" border border-solid bg-red-200 rounded-xl hover:bg-fuchsia-100" >Login</Button>

    </main>
  );
}
