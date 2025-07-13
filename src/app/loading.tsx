import { BreadCrumbHeaderLoader } from "@/components/layout/sidebar/breadcrumb-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EnrolledCourseSkeleton,
  ListLoadingSkeleton,
} from "@/feature/video-view/components/loader";

const DashboardLayoutSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
      {/* Left Sidebar Skeleton */}
      <div className="sticky top-0 hidden h-svh w-64 border-r bg-card p-4 md:block">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container pb-6">
        <div className="my-3.5">
          <BreadCrumbHeaderLoader />
        </div>
        <EnrolledCourseSkeleton />
      </div>

      {/* right side bar */}
      <div
        style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
        // collapsible="none"
        className="fixed bottom-6 left-4 h-16 w-[calc(100%_-_2rem)] bg-sidebar lg:sticky lg:top-0 lg:block lg:h-svh lg:w-[--sidebar-width]"
      >
        {/* <Skeleton className="h-full w-full" /> */}
        <div className="my-3 hidden w-full space-y-2 px-3 lg:block">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
        <div className="w-full overflow-hidden px-3">
          <ListLoadingSkeleton listCount={5} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutSkeleton;
