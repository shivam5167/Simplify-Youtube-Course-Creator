import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { enrollments, videos } from "@/drizzle/schema";

export const checkVideoExistAndIsEnrolledByVideoId = async ({
  videoId,
  userId,
}: {
  videoId: string;
  userId: string;
}) => {
  // check if video exists
  const [videoExist] = await db
    .select()
    .from(videos)
    .where(eq(videos.id, videoId)); // corrected variable name

  if (!videoExist) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Video not found" });
  }

  // check if user is enrolled
  const [isEnrolled] = await db
    .select()
    .from(enrollments)
    .where(
      and(
        eq(enrollments.courseId, videoExist.courseId),
        eq(enrollments.userId, userId)
      )
    );

  if (!isEnrolled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not enrolled in this course",
    });
  }

  return { videoExist, isEnrolled };
};
