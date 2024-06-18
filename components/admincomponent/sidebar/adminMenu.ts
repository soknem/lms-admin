import { AiOutlineLogout } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { FaBuilding, FaCashRegister, FaUser } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { HiCurrencyDollar, HiMiniAcademicCap } from "react-icons/hi2";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";

// set value of MenuList to display the sidebar menu
export const MenuList = [
  {
    path: "/admin/faculties",
    icon: FaBuilding,
    title: "Faculty",
    active: false,
  },
  {
    path: "/admin/academics",
    icon: HiMiniAcademicCap,
    title: "Academic",
    active: false,
    children: [
      {
        path: "/admin/academics",
        name: "Generations"
      },
      {
        path: "/admin/academics/classes",
        name: "Classes"
      },
      {
        path: "/admin/academics/assessments",
        name: "Assessments"
      },
      {
        path: "/admin/academics/lectures",
        name: "Lectures"
      }
    ]
  },
  {
    path: "/admin/materials",
    icon: BiSolidComponent,
    title: "Materials",
    active: false,
  },
  {
    path: "/admin/admissions",
    icon: FaCashRegister,
    title: "Admissions",
    active: false,
  },
  {
    path: "/admin/users",
    icon: FaUser,
    title: "Users",
    active: false,
  },
  {
    path: "/admin/payments",
    icon: HiCurrencyDollar,
    title: "Payments",
    active: false,
  },
  {
    path: "/admin/reports",
    icon: HiDocumentReport,
    title: "Reports",
    active: false,
  },
];

export const Logout = [
  {
    path: "#",
    icon: AiOutlineLogout,
    title: "Logout",
    active: false,
  },
];
