import { AiFillSchedule, AiOutlineLogout } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { BsMoonStarsFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { MdAssessment } from "react-icons/md";

// set value of MenuList to display the sidebar menu
export const MenuList = [
  {
    path: "/instructor/courses",
    icon: ImBooks,
    title: "Courses",
    active: false,
  },
  {
    path: "/instructor/schedules",
    icon: AiFillSchedule,
    title: "Schedules",
    active: false,
  }, 
  {
    path: "/instructor/materials",
    icon: BiSolidComponent,
    title: "Materials",
    active: false,
  },
  {
    path: "/instructor/assessments",
    icon: MdAssessment,
    title: "Assessments",
    active: false,
  },
  

  {
    path: "/instructor/reports",
    icon: HiDocumentReport,
    title: "Reports",
    active: false,
  },
  {
    path: "/instructor/settings",
    icon: IoSettings,
    title: "Settings",
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
