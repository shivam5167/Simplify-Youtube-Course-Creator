import { BreadCrumbHeaderLoader } from "@/components/layout/sidebar/breadcrumb-header";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrolledCourseSkeleton } from "@/feature/video-view/components/loader";

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
    </div>
  );
};

export default DashboardLayoutSkeleton;
