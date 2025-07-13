import { and, desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { author, courses, enrollments, videos } from "@/drizzle/schema";

export const getEnrolledCourses = async ({
  userId,
  page,
  limit,
  archivedCourse = false,
}: {
  userId: string;
  page: number;
  limit: number;
  archivedCourse?: boolean;
}) => {
  const res = await db
    .select({
      ...getTableColumns(enrollments),
      course: {
        ...getTableColumns(courses),
        video_count: db.$count(videos, eq(videos.courseId, courses.id)),
      },
      author: {
        ...getTableColumns(author),
      },
    })
    .from(enrollments)
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.isArchived, archivedCourse)
      )
    )
    .orderBy(desc(enrollments.updatedAt))
    .offset(Math.max(0, (page - 1) * limit))
    .limit(limit)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .innerJoin(author, eq(courses.authorId, author.id));

  return res;
};
