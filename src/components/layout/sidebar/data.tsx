import { ReactNode } from "react";

import { ArchiveIcon, BookMarkedIcon, LayoutDashboardIcon } from "lucide-react";

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: ReactNode;
}

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

export type { NavCollapsible, NavGroup, NavItem, NavLink };

export const sidebarData: Array<NavGroup> = [
  {
    title: "Dashboard and Profile",
    items: [
      {
        icon: <LayoutDashboardIcon size={16} />,
        title: "Dashboard",
        url: "/dashboard",
      },
      // {
      //   icon: <UserRoundIcon size={16} />,
      //   title: "Profile",
      //   url: "/profile",
      // },
    ],
  },
  {
    title: "Academic",
    items: [
      {
        title: "Courses",
        url: "/dashboard/courses",
        icon: <BookMarkedIcon size={16} />,
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Archived courses",
        url: "/dashboard/archived",
        icon: <ArchiveIcon size={16} />,
      },
    ],
  },
  // {
  //   title: "Settings",
  //   items: [
  //     {
  //       title: "Account",
  //       url: "/dashboard/account",
  //       icon: <SettingsIcon />,
  //     },
  //   ],
  // },
];
