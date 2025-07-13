import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

import {
  getPlaylistPrivate,
  getVideoByIdPrivate,
  getWatchHistoryPerVideo,
  insertNewWatchHistory,
  updatedWatchHistory,
} from "../db";
import { lastWatchedVideoSchema, videoListSchema } from "../schema";

export const courseViewRouter = createTRPCRouter({
  getVideoById: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ input: videoId, ctx }) => {
      return await getVideoByIdPrivate(videoId, ctx.sessionRes.user.id);
    }),

  getVideoList: protectedProcedure
    .input(videoListSchema)
    .query(async ({ input, ctx }) => {
      return await getPlaylistPrivate({
        courseId: input.courseId,
        userId: ctx.sessionRes.user.id,
        page: input.cursor || 1,
        limit: input.limit,
      });
    }),

  getWatchHistoryById: protectedProcedure
    .input(
      z.object({
        videoId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await getWatchHistoryPerVideo({
        videoId: input.videoId,
        userId: ctx.sessionRes.user.id,
      });
    }),

  updateLastWatchedVideo: protectedProcedure
    .input(lastWatchedVideoSchema)
    .mutation(async ({ input, ctx }) => {
      // check is enrolled and video exists
      const { videoExist, watchHistory } = await getVideoByIdPrivate(
        input.videoId,
        ctx.sessionRes.user.id
      );

      if (!videoExist) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Video not found" });
      }

      // if no watch history exists, create new one
      if (!watchHistory) {
        const result = await insertNewWatchHistory({
          videoId: input.videoId,
          courseId: videoExist.courseId,
          userId: ctx.sessionRes.user.id,
        });

        if (!result?.newHistory) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not create watch history",
          });
        }

        return {
          updatedHistory: result.newHistory,
          nextVideo: null,
        };
      }

      const res = await updatedWatchHistory(
        input.videoId,
        input.videoProgress,
        watchHistory.isCompleted || input.shouldMarkAsCompleted,
        input.totalDuration,
        videoExist.sequenceNumber + 1,
        videoExist.courseId
      );

      if (!res) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not update watch history",
        });
      }

      return {
        ...res,
        nextVideo: input.shouldGoToNextVideo ? res.nextVideo : null,
      };
    }),
});
