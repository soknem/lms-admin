import React from "react";
import Image from "next/image";


export default function NavbarComponent() {
  return (
    <div className="flex w-full items-center px-4 justify-between h-20 bg-white">
      {/* loge */}
      <section>
        <Image src="/logo.png" alt="logo" width={135} height={48} />
      </section>

      {/* profile */}
      <section className="flex gap-4">
        <Image src="/admin.png" alt="admin" width={30} height={30}/>
        <p className="text-black font-semibold text-xl">Student</p>
      </section>
    </div>
  );
}
