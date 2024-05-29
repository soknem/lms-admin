import { AiOutlineLogout } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { IoSettings } from "react-icons/io5";

export const MenuList = [
  {
    path: "/student/courses",
    icon: ImBooks,
    active: false,
  },

  {
    path: "/student/achivements",
    icon: FaAddressCard,
    active: false,
  },
  {
    path: "/student/settings",
    icon: IoSettings,
    active: false,
  },
  {
    path: "#",
    icon: BsMoonStarsFill,
    active: false,
  },
];

export const Logout = [
  {
    path: "#",
    icon: AiOutlineLogout,
    active: false,
  },
];
