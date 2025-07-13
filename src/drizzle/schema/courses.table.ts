import { InferInsertModel, relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { author } from "./author.table";
import { courseReviews } from "./course-reviews.table";
import { enrollments } from "./enrollments.table";
import { users } from "./user.table";
import { videos } from "./videos.table";

export const courses = pgTable(
  "courses",
  {
    id,
    title: text("title").notNull(),
    description: text("description"),
    youtubePlaylistId: text("youtube_playlist_id").notNull().unique().notNull(),
    avgRatings: integer("avg_ratings"),
    thumbnail: text("thumbnail"),
    authorId: uuid("author_id")
      .notNull()
      .references(() => author.id, {
        onDelete: "set null",
      }),
    creator: uuid("creator")
      .notNull()
      .references(() => users.id, {
        onDelete: "set null",
      }),
    isPublic: boolean("is_public").notNull().default(false),
    enrolledStudentCount: integer("enrolled_student_count")
      .notNull()
      .default(0),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("course_author_id_idx").on(table.authorId),
    index("creator_id_idx").on(table.creator),
    uniqueIndex("youtube_playlist_id_unique").on(table.youtubePlaylistId),
  ]
);

export const courseRelations = relations(courses, ({ many, one }) => ({
  author: one(author, {
    fields: [courses.authorId],
    references: [author.id],
  }),
  creator: one(users, {
    fields: [courses.creator],
    references: [users.id],
  }),
  videos: many(videos),
  enrollments: many(enrollments),
  reviews: many(courseReviews),
}));

export type CourseInsertionType = InferInsertModel<typeof courses>;
