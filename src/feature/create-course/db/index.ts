import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import {
  CourseInsertionType,
  InsertAuthorType,
  VideoInsertType,
  author,
  courses,
  enrollments,
  videos,
} from "@/drizzle/schema";

export const insertNewCourse = async (courseInfo: CourseInsertionType) => {
  // check if course already exist
  const [courseExist] = await db
    .select()
    .from(courses)
    .where(eq(courses.youtubePlaylistId, courseInfo.youtubePlaylistId));

  if (courseExist)
    throw new TRPCError({
      code: "CONFLICT",
      message: "Course already exist",
    });

  const [createdCourse] = await db
    .insert(courses)
    .values(courseInfo)
    .returning();

  if (!createdCourse) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not create course",
    });
  }

  return createdCourse;
};

export const getAuthorById = async (channelId: string) => {
  const [authorExist] = await db
    .select()
    .from(author)
    .where(eq(author.youtubeChannelId, channelId));

  if (!authorExist) return null;

  return authorExist;
};

export const insertAuthor = async ({
  authorInfo,
}: {
  authorInfo: InsertAuthorType;
  shouldCheckAuthor?: boolean;
}) => {
  const [authorExist] = await db
    .select()
    .from(author)
    .where(eq(author.youtubeChannelId, authorInfo.youtubeChannelId));

  if (authorExist) {
    return authorExist;
  }

  const [createdAuthor] = await db
    .insert(author)
    .values(authorInfo)
    .returning();

  return createdAuthor;
};

export const insertVideos = async (videoInfo: Array<VideoInsertType>) => {
  const hasInserted = await db.insert(videos).values(videoInfo).returning({
    id: videos.id,
  });

  return hasInserted;
};

export const enrollUserToCourse = async (courseId: string, userId: string) => {
  const [enrolled] = await db
    .select()
    .from(enrollments)
    .where(
      and(eq(enrollments.courseId, courseId), eq(enrollments.userId, userId))
    )
    .execute();

  if (enrolled)
    throw new TRPCError({
      code: "CONFLICT",
      message: "User already enrolled to the course",
    });

  const [firstVideo] = await db
    .select({
      id: videos.id,
    })
    .from(videos)
    .where(eq(videos.courseId, courseId))
    .orderBy(videos.sequenceNumber)
    .limit(1)
    .execute();

  if (!firstVideo) {
    throw new TRPCError({
      message: "No videos found for the course",
      code: "NOT_FOUND",
    });
  }

  const [enrolledCourse] = await db
    .insert(enrollments)
    .values({
      courseId,
      userId,
      lastAccessedVideoId: firstVideo.id,
      lastAccessedAt: new Date(),
    })
    .returning();

  if (!enrolledCourse) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not enroll user to the course",
    });
  }

  return enrolledCourse;
};

export const getCourseByPlaylistId = async (playlistId: string) => {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.youtubePlaylistId, playlistId))
    .execute();

  return course;
};
