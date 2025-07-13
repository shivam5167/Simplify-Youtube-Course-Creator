import { TRPCError } from "@trpc/server";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import {
  VideoInsertType,
  courses,
  enrollments,
  videos,
} from "@/drizzle/schema";
import { getVideoThumbnail, playlistItemsFetcher } from "@/lib/helps";
import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

import { getEnrolledCourses } from "../db";

export const enrolledCourseRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
        archivedCourse: z.boolean().default(false),
      })
    )
    .query(async ({ input, ctx }) => {
      return await getEnrolledCourses({
        userId: ctx.sessionRes.user.id,
        page: input.page,
        limit: input.limit,
        archivedCourse: input.archivedCourse,
      });
    }),

  syncWithYoutube: protectedProcedure
    .input(
      z.object({
        courseId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Sync with YouTube logic
      const [courseExists] = await ctx.db
        .select()
        .from(courses)
        .where(eq(courses.id, input.courseId));
      if (!courseExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      // get all the videos of the course
      const existingVideos = await ctx.db
        .select({
          id: videos.id,
          youtubeId: videos.youtube_video_id,
          sequenceCount: videos.sequenceNumber,
        })
        .from(videos)
        .where(eq(videos.courseId, input.courseId))
        .orderBy(asc(videos.sequenceNumber));

      // fetch new videos from youtube
      // get the initial video

      const playlistItems = await playlistItemsFetcher(
        courseExists.youtubePlaylistId
      );

      if ("error" in playlistItems) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch playlist items",
        });
      }

      if (!playlistItems.items.length) {
        throw new TRPCError({
          message: "Playlist does not contain any videos",
          code: "NOT_FOUND",
        });
      }
      let sequenceCounter =
        (existingVideos[existingVideos.length - 1]?.sequenceCount ?? 0) + 1;

      // formate the initial videos
      const formattedPlaylistItems: Array<VideoInsertType> =
        playlistItems.items.map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          courseId: courseExists.id,
          youtube_video_id: item.snippet.resourceId.videoId,
          sequenceNumber: sequenceCounter++,
          thumbnail: getVideoThumbnail(item.snippet.thumbnails)?.url,
          publishedAt: item.snippet.publishedAt,
        }));

      //hunt for the remaining videos
      let nextPageToken: string | undefined = playlistItems.nextPageToken;
      while (nextPageToken) {
        const playlistItemsNext = await playlistItemsFetcher(
          courseExists.youtubePlaylistId,
          nextPageToken
        );

        if ("error" in playlistItemsNext) {
          throw new TRPCError({
            message: "Failed to fetch playlist items",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        nextPageToken = playlistItemsNext?.nextPageToken;

        const subList = playlistItemsNext.items.map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          courseId: courseExists.id,
          youtube_video_id: item.snippet.resourceId.videoId,
          sequenceNumber: sequenceCounter++,
          thumbnail: getVideoThumbnail(item.snippet.thumbnails)?.url,
          publishedAt: item.snippet.publishedAt,
        }));

        formattedPlaylistItems.push(...subList);
      }

      // filter out the existing videos
      const newVideos = formattedPlaylistItems.filter(
        (item) =>
          !existingVideos.find(
            (video) => video.youtubeId === item.youtube_video_id
          )
      );

      if (newVideos.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No new videos found",
        });
      }

      const hasInserted = await ctx.db
        .insert(videos)
        .values(newVideos)
        .returning({
          id: videos.id,
        });

      if (newVideos.length !== hasInserted.length) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to insert new videos",
        });
      }

      return {
        success: true,
        message: `${newVideos.length} new videos added successfully.`,
      };
    }),

  archiveToggler: protectedProcedure
    .input(
      z.object({
        enrollmentId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [enrollment] = await ctx.db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.id, input.enrollmentId),
            eq(enrollments.userId, ctx.sessionRes.user.id)
          )
        );

      if (!enrollment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Enrollment not found",
        });
      }

      const [updatedEnrollment] = await ctx.db
        .update(enrollments)
        .set({
          isArchived: !enrollment.isArchived,
        })
        .where(eq(enrollments.id, input.enrollmentId))
        .returning();

      if (!updatedEnrollment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update enrollment",
        });
      }

      return updatedEnrollment;
    }),
  bookmarkToggler: protectedProcedure
    .input(
      z.object({
        enrollmentId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [enrollment] = await ctx.db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.id, input.enrollmentId),
            eq(enrollments.userId, ctx.sessionRes.user.id)
          )
        );

      if (!enrollment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Enrollment not found",
        });
      }

      const [updatedEnrollment] = await ctx.db
        .update(enrollments)
        .set({
          isBookMarked: !enrollment.isBookMarked,
        })
        .where(eq(enrollments.id, input.enrollmentId))
        .returning();
      if (!updatedEnrollment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update bookmark status",
        });
      }

      return updatedEnrollment;
    }),
});
