import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../schema.helper";
import { users } from "./user.table";

export const session = pgTable(
  "session",
  {
    id,
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt,
    updatedAt,
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);
