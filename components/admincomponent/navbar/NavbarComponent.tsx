import React, {useEffect} from "react";
import Image from "next/image";
import {useAppDispatch} from "@/lib/hook";
import {
    selectPosition,
    selectProfile,
    selectUsername
} from "@/lib/features/userProfile/userProfileSlice";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import placeholder from "@/public/common/placeholderPf.png"

export default function NavbarComponent() {

    const profileImage = useSelector((state: RootState) => selectProfile(state));
    const username = useSelector((state: RootState) => selectUsername(state));
    const position = useSelector((state: RootState) => selectPosition(state));


  return (
    <div className="flex w-full items-center px-9 justify-between h-[72px] bg-white">
      {/* loge */}
      <section>
        <Image src="/logo.png" alt="logo" width={135} height={48} />
      </section>

      {/* profile */}
        <section className="flex flex-row gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                {profileImage ? (
                    <Image src={profileImage} alt="admin" layout="fill" objectFit="cover"/>
                ) : (
                    <Image src={placeholder} alt="admin" layout="fill" objectFit="cover"/>
                )}
            </div>

            <div>
                <p className="text-black font-semibold text-xl ">{username || "Username"}</p>
                <p className="text-lms-gray-30 font-semibold text-sm  ">{position || "Position"}</p>
            </div>

        </section>
    </div>
  );
}
