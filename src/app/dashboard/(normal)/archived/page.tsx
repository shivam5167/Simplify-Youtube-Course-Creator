import { Metadata } from "next";
import Image from "next/image";

import EnrolledCourseCard from "@/feature/enrolled-course/components/enrolled-course-card";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Archived Courses | Dashboard",
  description:
    "View and manage your enrolled courses. Continue learning from where you left off.",
};

export const dynamic = "force-dynamic";

const ArchivedCourses = async () => {
  const res = await api.enrolledCourse.get({
    archivedCourse: true,
  });

  if (!res || res.length === 0) {
    return (
      <div className="container">
        <div className="mb-4 text-2xl font-semibold">
          <h1>Archived Courses</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-screen-sm">
            <Image
              src={"/images/no-archive.svg"}
              alt="no archive"
              width={300}
              height={300}
              unoptimized
              className="size-full select-none"
            />
          </div>
          <p className="-mt-8 font-semibold text-muted-foreground">
            No archived enrolled courses found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-4 text-2xl font-semibold">
        <h1>Enrolled Courses</h1>
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

export default ArchivedCourses;
