import { AiOutlineLogout } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { IoSettings } from "react-icons/io5";


// set value of MenuList to display the sidebar menu
export const MenuList = [
  {
    path: "/student/courses",
    icon: ImBooks,
    title: "Course",
    active: false,
  },

  {
    path: "/student/achivements",
    icon: FaAddressCard,
    title: "Achievements",
    active: false,
  },
  {
    path: "/student/settings",
    icon: IoSettings,
    title: "Setting",
    active: false,
  }
];

export const Logout = [
  {
    path: "#",
    icon: AiOutlineLogout,
    title: "Logout",
    active: false,
  },
];
