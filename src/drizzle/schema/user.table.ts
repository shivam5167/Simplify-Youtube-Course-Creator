import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { comments } from "./comments.table";
import { courseReviews } from "./course-reviews.table";
import { courses } from "./courses.table";
import { enrollments } from "./enrollments.table";
import { notes } from "./notes.table";
import { videoProgress } from "./video-progress";

export const users = pgTable("user", {
  id,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt,
  updatedAt,
});

export const userRelation = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  creator: many(courses),
  videoProgress: many(videoProgress),
  notes: many(notes),
  comments: many(comments),
  courseReviews: many(courseReviews),
}));
