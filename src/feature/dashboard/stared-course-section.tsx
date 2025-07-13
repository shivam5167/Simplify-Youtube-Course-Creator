import { StarIcon } from "lucide-react";

import EnrolledCourseCard from "@/feature/enrolled-course/components/enrolled-course-card";
import { api } from "@/trpc/server";

const StartedCoursesSection = async () => {
  const res = await api.dashboard.getStartedCourses();

  if (res.length === 0) {
    return (
      <div className="mt-4">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">
            Bookmark courses
          </h3>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-4">
          <p>No bookmark</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full">
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
          <StarIcon className="size-[1.4em] fill-yellow-300 stroke-yellow-400 text-base" />{" "}
          Bookmarked courses
        </h3>
      </div>

      <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(5_,_auto)]">
        {res.map((item) => (
          <EnrolledCourseCard
            enrollmentId={item.id}
            isArchived={item?.isArchived || false}
            isBookmarked={item?.isBookMarked || false}
            key={item.id}
            lastAccessedVideo={item.lastAccessedVideoId ?? ""}
            course={item.course}
            author={item.author}
          />
        ))}
      </ul>
    </div>
  );
};

export default StartedCoursesSection;
