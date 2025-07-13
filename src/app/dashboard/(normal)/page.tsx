import { redirect } from "next/navigation";
import { Suspense } from "react";

import CreateCourseForm from "@/feature/create-course/component/create-course-form";
import { LastAccessedLoader } from "@/feature/dashboard/component/loaders";
import LastAccessedVideoSection from "@/feature/dashboard/last-access-videos-section";
import StartedCoursesSection from "@/feature/dashboard/stared-course-section";
import { getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();

  if (!session?.session) {
    return redirect("/");
  }

  return (
    <div className="container w-full pb-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        <h1 className="text-2xl font-semibold">
          <span>Welcome back</span>
          &nbsp;
          <span className="text-blue-700">{session.user.name}</span>
        </h1>
        <CreateCourseForm className="h-8 w-fit self-end !px-3 text-sm font-medium" />
      </div>

      <Suspense fallback={<LastAccessedLoader />}>
        <LastAccessedVideoSection />
      </Suspense>
      <Suspense fallback={<LastAccessedLoader title="Bookmarked courses" />}>
        <StartedCoursesSection />
      </Suspense>
    </div>
  );
}
