import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { courses } from "./courses.table";
import { users } from "./user.table";
import { videos } from "./videos.table";

export const enrollments = pgTable(
  "enrollments",
  {
    id,
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, {
        onDelete: "cascade",
      }),
    lastAccessedAt: timestamp("last_accessed_at"),
    lastAccessedVideoId: uuid("last_accessed_video_id")
      .references(() => videos.id)
      .notNull(),
    progress: integer("progress").default(0), // overall progress in
    completedAt: timestamp("completed_at"),
    isArchived: boolean("is_archived").default(false),
    isBookMarked: boolean("is_bookmarked").default(false),
    enrolledAt: timestamp("enrolled_at").notNull().defaultNow(),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("completed_at_index").on(table.completedAt),
    uniqueIndex("enrollment_course_idx").on(table.userId, table.courseId),
    index("last_accessed_at_index").on(table.lastAccessedAt),
    index("enrollment_user_id_idx").on(table.userId),
  ]
);

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  lastAccessedVideo: one(videos, {
    fields: [enrollments.lastAccessedVideoId],
    references: [videos.id],
  }),
}));
