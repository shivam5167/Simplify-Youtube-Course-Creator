"use client";

import React, { ComponentProps } from "react";

import { ListVideoIcon } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

import { useVideoPlayer } from "../provider/video-player.provider";
import PlayList from "./play-list";

interface Props extends ComponentProps<typeof Sidebar> {
  params: {
    id: string;
  };
}

const RightSidebar: React.FC<Props> = ({ params, ...props }) => {
  const activeVideoTitle = useVideoPlayer((state) => state.activeVideoTitle);
  const playerHeight = useVideoPlayer((state) => state.videoPlayerHeight);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { state } = useSidebar();

  if (isDesktop) {
    return (
      <Sidebar
        collapsible="none"
        style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
        className={"sticky top-0 hidden h-svh lg:flex"}
        variant="floating"
        {...props}
      >
        <SidebarHeader className="line-clamp-2 font-semibold">
          <span className="line-clamp-2 text-start">
            {activeVideoTitle || "Video playing"}
          </span>
        </SidebarHeader>
        <SidebarContent>
          <PlayList
            key={"video-playlist"}
            courseId={params.id}
            className="min-w-full"
          />
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!isDesktop) {
    return (
      <Drawer autoFocus={false} modal={false}>
        <DrawerTrigger asChild>
          <button
            className={cn(
              "fixed bottom-4 left-4 flex items-start gap-1 rounded-lg border-2 bg-slate-300/50 px-3 py-2 text-sm font-medium shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-white",
              state === "expanded" && isDesktop
                ? "left-[calc(var(--sidebar-width)+1rem)] w-[calc(100%-2rem-var(--sidebar-width))]"
                : "w-[calc(100%-2rem)]"
            )}
          >
            <ListVideoIcon className="mt-1 size-4 shrink-0" />
            <span className="line-clamp-2 text-start">
              {activeVideoTitle || "Video playing"}
            </span>
          </button>
        </DrawerTrigger>
        <DrawerContent
          style={{
            height: `calc(100dvh - ${playerHeight}px - var(--header))`,
          }}
          className="pb-3"
        >
          <DrawerHeader>
            <DrawerTitle className="line-clamp-2 text-start">
              <span className="line-clamp-2">
                {activeVideoTitle || "Video playing"}
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <PlayList
            key={"video-playlist"}
            courseId={params.id}
            className="min-w-full"
          />
        </DrawerContent>
      </Drawer>
    );
  }
};

export default RightSidebar;
