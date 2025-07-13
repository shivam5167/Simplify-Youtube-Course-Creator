import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { users } from "./user.table";
import { videos } from "./videos.table";

export const videoProgress = pgTable(
  "video_progress",
  {
    id,
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    videoId: uuid("video_id")
      .notNull()
      .references(() => videos.id, {
        onDelete: "cascade",
      }),
    watchedDuration: integer("watched_duration").default(0), // in seconds
    totalDuration: integer("total_duration").default(0), // in seconds
    isCompleted: boolean("is_completed").default(false).notNull(),
    lastWatchedAt: timestamp("last_watched_at").defaultNow(),
    isRewatching: boolean("is_rewatching").default(false).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("video_progress_user_video_unique").on(
      table.userId,
      table.videoId
    ),
  ]
);

export const videoProgressRelations = relations(videoProgress, ({ one }) => ({
  user: one(users, {
    fields: [videoProgress.userId],
    references: [users.id],
  }),
  video: one(videos, {
    fields: [videoProgress.videoId],
    references: [videos.id],
  }),
}));
