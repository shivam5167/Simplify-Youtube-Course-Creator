import { z } from "zod";

export const importPlaylistSchema = z.object({
  url: z
    .string()
    .url({
      message: "Please enter a valid URL",
    })
    .refine(
      (val) => {
        const youtubePlaylistRegex =
          /^https:\/\/(www\.)?youtube\.com\/playlist\?list=.+$/;
        return youtubePlaylistRegex.test(val);
      },
      {
        message: "Invalid YouTube playlist URL",
      }
    ),
});

export type ImportPlaylistSchemaType = z.infer<typeof importPlaylistSchema>;
