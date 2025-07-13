import { Metadata } from "next";
import React, { Suspense } from "react";

import { type SearchParams } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoNotes, {
  VideoNotesLoadingSkeleton,
} from "@/feature/notes/components/video-notes";
import {
  DescriptionSkeleton,
  EnrolledCourseSkeleton,
} from "@/feature/video-view/components/loader";
import QueryClientErrorBoundary from "@/feature/video-view/components/query-client-error";
import VideoDescription from "@/feature/video-view/components/video-description";
import VideoPlayer from "@/feature/video-view/components/video-player";
import { loadVideoIdSearchParams } from "@/feature/video-view/validator";
import { HydrateClient, api } from "@/trpc/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

export const metadata: Metadata = {
  title: "Courses View | Dashboard",
  description:
    "View and manage your enrolled courses. Continue learning from where you left off.",
};

const EnrolledCourse: React.FC<Props> = async ({ searchParams }) => {
  const { v } = await loadVideoIdSearchParams(searchParams);
  if (!v) {
    return null;
  }

  void api.courseView.getVideoById.prefetch(v);
  void api.notes.getNotesByVideoId.prefetch(v);

  return (
    <div className="pb-6 md:container">
      <div>
        <HydrateClient>
          <Suspense key={v} fallback={<EnrolledCourseSkeleton />}>
            <QueryClientErrorBoundary>
              <VideoPlayer videoId={v} />
            </QueryClientErrorBoundary>
          </Suspense>
          <div className="relative mt-2 px-4 md:px-0">
            <Tabs defaultValue="description" className="pb-14">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent
                className="h-full rounded-lg bg-primary-80 p-3 md:p-5"
                value="description"
              >
                <Suspense fallback={<DescriptionSkeleton />}>
                  <VideoDescription videoId={v} />
                </Suspense>
              </TabsContent>
              <TabsContent value="notes">
                <Suspense key={v} fallback={<VideoNotesLoadingSkeleton />}>
                  <QueryClientErrorBoundary>
                    <VideoNotes videoId={v} />
                  </QueryClientErrorBoundary>
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </HydrateClient>
      </div>
    </div>
  );
};

export default EnrolledCourse;
