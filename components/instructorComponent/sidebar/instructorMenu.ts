import { AiFillSchedule, AiOutlineLogout } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { BsMoonStarsFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { MdAssessment } from "react-icons/md";

export const MenuList = [
  {
    path: "/instructor/courses",
    icon: ImBooks,
    active: false,
  },
  {
    path: "/instructor/schedules",
    icon: AiFillSchedule,
    active: false,
  }, 
  {
    path: "/instructor/materials",
    icon: BiSolidComponent,
    active: false,
  },
  {
    path: "/instructor/assessments",
    icon: MdAssessment,
    active: false,
  },
  

  {
    path: "/instructor/reports",
    icon: HiDocumentReport,
    active: false,
  },
  {
    path: "/instructor/settings",
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
