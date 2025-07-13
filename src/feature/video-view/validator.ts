import { createLoader, parseAsString } from "nuqs/server";

export const videoIdSearchParams = {
  v: parseAsString,
};
export const loadVideoIdSearchParams = createLoader(videoIdSearchParams);

export type VideoIdSearchParamsT = ReturnType<typeof loadVideoIdSearchParams>;
