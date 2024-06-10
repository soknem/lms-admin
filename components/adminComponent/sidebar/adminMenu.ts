import { AiOutlineLogout } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaBuilding, FaCashRegister, FaUser } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { HiCurrencyDollar, HiMiniAcademicCap } from "react-icons/hi2";

// set value of MenuList to display the sidebar menu
export const MenuList = [
  {
    path: "/admin/faculties",
    icon: FaBuilding,
    active: false,
  },
  {
    path: "/admin/academics",
    icon: HiMiniAcademicCap,
    active: false,
  },
  {
    path: "/admin/materials",
    icon: BiSolidComponent,
    active: false,
  },
  {
    path: "/admin/admissions",
    icon: FaCashRegister,
    active: false,
  },
  {
    path: "/admin/users",
    icon: FaUser,
    active: false,
  },
  {
    path: "/admin/payments",
    icon: HiCurrencyDollar,
    active: false,
  },
  {
    path: "/admin/reports",
    icon: HiDocumentReport,
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
