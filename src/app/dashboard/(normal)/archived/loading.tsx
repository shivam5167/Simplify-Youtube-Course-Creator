import { Skeleton } from "@/components/ui/skeleton";

const CourseLoading = () => {
  return (
    <div className="container">
      <div className="mb-4">
        <Skeleton className="h-8 w-48" />
      </div>

      <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(5_,_auto)]">
        {Array.from({ length: 6 }).map((_, index) => (
          <EnrolledCourseSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

const EnrolledCourseSkeleton = () => {
  return (
    <li className="grid grid-rows-subgrid overflow-hidden rounded-xl border bg-card p-3 px-4 text-card-foreground shadow [grid-row:span_5]">
      {/* Thumbnail Skeleton */}
      <Skeleton className="aspect-video w-full rounded-md" />

      {/* Title Skeleton */}
      <div className="space-y-2 py-2">
        <Skeleton className="h-6 w-3/4" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Author Avatar Skeleton */}
      <div className="flex items-center gap-2 py-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-10 w-full" />
    </li>
  );
};

export default CourseLoading;
