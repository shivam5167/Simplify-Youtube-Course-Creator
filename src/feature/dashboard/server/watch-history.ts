import { and, desc, eq, getTableColumns } from "drizzle-orm";

import {
  author,
  courses,
  enrollments,
  videoProgress,
  videos,
} from "@/drizzle/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

export const dashboard = createTRPCRouter({
  lastAccessVideos: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db
      .select({
        ...getTableColumns(videos),
        author: {
          ...getTableColumns(author),
        },
        watchDuration: videoProgress.watchedDuration,
        totalDuration: videoProgress.totalDuration,
      })
      .from(enrollments)
      .where(eq(enrollments.userId, ctx.sessionRes.user.id))
      .orderBy(desc(enrollments.updatedAt))
      .innerJoin(videos, eq(videos.id, enrollments.lastAccessedVideoId))
      .innerJoin(courses, eq(courses.id, enrollments.courseId))
      .innerJoin(author, eq(author.id, courses.authorId))
      .innerJoin(videoProgress, eq(videoProgress.videoId, videos.id));
    return res;
  }),
  getStartedCourses: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db
      .select({
        ...getTableColumns(enrollments),
        course: {
          ...getTableColumns(courses),
          video_count: ctx.db.$count(videos, eq(videos.courseId, courses.id)),
        },
        author: {
          ...getTableColumns(author),
        },
      })
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, ctx.sessionRes.user.id),
          eq(enrollments.isArchived, false),
          eq(enrollments.isBookMarked, true)
        )
      )
      .orderBy(desc(enrollments.updatedAt))
      .limit(5)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .innerJoin(author, eq(courses.authorId, author.id));

    return res;
  }),
});
