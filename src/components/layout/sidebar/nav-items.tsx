"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavGroup, NavItem } from "./data";

const NavItems: React.FC<NavGroup> = ({ items, title }) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={checkIsActive(pathname, item)}
                tooltip={item.title}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.url ?? ""}>
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavItems;

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url?.split("?")[0] ||
    href.split("?")[0] === item.url?.split("?")[0] ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] === item?.url?.split("/")[1])
  );
}
