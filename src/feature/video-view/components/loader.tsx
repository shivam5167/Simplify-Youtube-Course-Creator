import { FC } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// import { SIDEBAR_WIDTH } from "./right-sidebar";

export const ListLoadingSkeleton: FC<{
  className?: string;
  listCount?: number;
}> = ({ className, listCount = 8 }) => {
  return (
    <ul className={cn("!w-[var(--sidebar-width)] space-y-4", className)}>
      {Array.from({ length: listCount }).map((_, index) => (
        <li
          className="hidden items-center space-x-2 rounded-lg border p-2 shadow-md lg:flex"
          key={index}
        >
          <Skeleton className="relative aspect-video size-full w-28 shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="ml-auto h-3 w-20" />
          </div>
        </li>
      ))}
      <li className="flex gap-1 px-4 lg:hidden">
        <Skeleton className="size-5 shrink-0" />
        <div className="w-full flex-1 space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </li>
    </ul>
  );
};

export const EnrolledCourseSkeleton: React.FC<{ showTab?: boolean }> = ({
  showTab = true,
}) => {
  return (
    <div>
      <Skeleton className="aspect-video w-full md:rounded-lg" />

      {showTab && (
        <div className="mt-2">
          <div className="flex gap-2 border-b pb-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      )}
    </div>
  );
};

export const DescriptionSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export const RightSidebarSkeleton: React.FC = () => {
  return (
    <Sidebar
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
      collapsible="none"
      className="fixed bottom-6 left-4 h-16 w-[calc(100%_-_2rem)] lg:sticky lg:flex lg:h-dvh lg:w-[--sidebar-width]"
    >
      <SidebarHeader className="hidden lg:flex">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </SidebarHeader>
      <SidebarContent>
        <ListLoadingSkeleton />
      </SidebarContent>
    </Sidebar>
  );
};
