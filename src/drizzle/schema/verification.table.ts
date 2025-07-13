import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";

export const verification = pgTable("verification", {
  id,
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt,
  updatedAt,
});
