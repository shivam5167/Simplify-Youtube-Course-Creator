import { relations, sql } from "drizzle-orm";
import { index, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { createdAt, updatedAt } from "../schema.helper";
import { courses } from "./courses.table";
import { videos } from "./videos.table";

export const courseSection = pgTable(
  "course_section",
  {
    id: uuid("id")
      .notNull()
      .default(sql`gen_random_uuid()`),
    name: uuid("name").notNull(),
    description: uuid("description"),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id),
    videoId: uuid("video_id").references(() => videos.id),
    createdAt,
    updatedAt,
  },
  (table) => [
    primaryKey({ columns: [table.courseId, table.videoId] }),
    index("course_section_id").on(table.id),
  ]
);

export const courseSectionRelations = relations(
  courseSection,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [courseSection.courseId],
      references: [courses.id],
    }),
    videos: many(videos),
  })
);
