import { z } from "zod";

import { paginationSchema } from "../common-zod-validator";

export const videoListSchema = paginationSchema
  .extend({
    courseId: z.string().uuid(),
    cursor: z.coerce.number().nullable().default(1),
  })
  .omit({
    page: true,
  });

export type VideoListSchemaT = z.infer<typeof videoListSchema>;

export const lastWatchedVideoSchema = z.object({
  videoId: z.string().uuid(),
  videoProgress: z.number(),
  shouldMarkAsCompleted: z.boolean().default(false),
  totalDuration: z.coerce.number(),
  shouldGoToNextVideo: z.boolean().default(false),
});
