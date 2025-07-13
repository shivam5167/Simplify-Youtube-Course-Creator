"use client";

import Link from "next/link";
import { useCallback } from "react";

import {
  BellIcon,
  ChevronsUpDown,
  HomeIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";

const navUserLink = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  // {
  //   label: "Settings",
  //   href: "/settings",
  //   icon: SettingsIcon,
  // },
  {
    label: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
];

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isPending, data } = useSession();
  const { setTheme } = useTheme();

  const handelLogout = useCallback(async () => {
    await signOut({
      fetchOptions: {
        redirect: "follow",
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  }, []);

  if (isPending) {
    return <Skeleton className="h-11 w-full" />;
  }

  if (!data) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={data.user.image ?? ""} alt={data.user.name} />
                <AvatarFallback className="rounded-lg">
                  {data.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data.user.name}</span>
                <span className="truncate text-xs">{data.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    src={data.user.image ?? ""}
                    alt={data.user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data.user.name}
                  </span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navUserLink.map((link, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="hover:cursor-pointer"
                >
                  <Link href={link.href}>
                    {link.icon && (
                      <DropdownMenuShortcut className="ml-0">
                        <link.icon className="size-4" />
                      </DropdownMenuShortcut>
                    )}
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuShortcut className="ml-0">
                    <SunMoonIcon />
                  </DropdownMenuShortcut>
                  Theme toggle
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-medium">
                      Theme Toggler
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Button
                        variant={"ghost"}
                        onClick={() => setTheme("light")}
                        size={"sm"}
                        className="w-full"
                      >
                        <DropdownMenuShortcut className="ml-auto">
                          <SunIcon className="size-4" />
                        </DropdownMenuShortcut>
                        Light mode
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        onClick={() => setTheme("dark")}
                        variant={"ghost"}
                        size={"sm"}
                        className="w-full"
                      >
                        <DropdownMenuShortcut className="ml-auto">
                          <MoonIcon className="size-4" />
                        </DropdownMenuShortcut>
                        Dark mode
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full cursor-pointer justify-start"
                onClick={handelLogout}
              >
                <LogOutIcon />
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
