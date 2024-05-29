"use client";

import { Sidebar } from "flowbite-react";

import Link from "next/link";
import React, { useState } from "react";
import { Logout, MenuList } from "./studentMenu";
import { usePathname } from "next/navigation";
import { customize } from "../../customize";

type MenuItem = {
  path: string;
  active: boolean;
  icon: any;
};

type Logout = {
  path: string;
  active: boolean;
  icon: any;
};

export default function SideBarComponent() {
  const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);
  const [logout, setLogout] = useState<Logout[]>(Logout);
  const pathname = usePathname();
  return (
    <Sidebar
      theme={customize.sidebar}
      aria-label="Sidebar with content separator example"
      className="w-20"
    >
      <Sidebar.Items className="flex flex-col justify-between">
        <Sidebar.ItemGroup className="flex flex-col ">
          {menuList.map((item, index) => (
            <Sidebar.Item
              key={index}
              as={Link}
              href={item.path}
              active={pathname === item.path}
              icon={item.icon}
              className="flex flex-col items-center justify-center"
            ></Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="flex flex-col justify-between">
          {Logout.map((item, index) => (
            <Sidebar.Item
              key={index}
              as={Link}
              href={item.path}
              active={pathname === item.path}
              icon={item.icon}
              className="flex flex-col items-center justify-center "
            ></Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
