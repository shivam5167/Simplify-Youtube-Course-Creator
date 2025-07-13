import { InferInsertModel, relations } from "drizzle-orm";
import { index, integer, pgTable, text } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { courses } from "./courses.table";

export const author = pgTable(
  "authors",
  {
    id,
    name: text("name").notNull(),
    imgUrl: text("img_url").notNull(),
    bio: text("bio").notNull(),
    subscriberCount: integer("subscriber_count").notNull().default(0),
    youtubeChannelId: text("youtube_channel_id").unique().notNull(),
    customUrl: text("youtube_channel_url"),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("subscriber_count_idx").on(table.subscriberCount),
    index("youtube_channel_id_idx").on(table.youtubeChannelId),
  ]
);

export const authorRelations = relations(author, ({ many }) => ({
  courses: many(courses),
}));

export type InsertAuthorType = InferInsertModel<typeof author>;
