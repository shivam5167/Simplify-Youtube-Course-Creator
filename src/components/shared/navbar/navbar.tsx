"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

import ProfileMenu from "./profile-menu";

const ThemeToggler = dynamic(() => import("../theme-toggler"), {
  ssr: false,
  loading: () => <Skeleton className="size-8 rounded-full" />,
});

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header)] items-center justify-center border-b bg-transparent backdrop-blur-md">
      <nav className="flex w-full items-center justify-between px-6">
        <Link
          href={"/"}
          aria-label="logo"
          className="font-rubik-gemstone font-thin tracking-widest md:text-2xl"
        >
          Simplify
        </Link>

        <div className="flex items-center space-x-2">
          <ThemeToggler />
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
