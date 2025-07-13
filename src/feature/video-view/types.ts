import { useWatchHistoryQuery } from "./api/use-watch-history-query";
import { getVideoByIdPrivate } from "./db";

export type GetVideoByIdSuccessResponse = NonNullable<
  Awaited<ReturnType<typeof getVideoByIdPrivate>>
>;

export type GetVideoHistoryById = NonNullable<
  Awaited<ReturnType<typeof useWatchHistoryQuery>>["data"]
>;
export interface TimestampMatch {
  timestamp: string;
  index: number;
  length: number;
  seconds: number;
}

export interface TextSegment {
  type: "text";
  content: string;
}

export interface TimestampSegment {
  type: "timestamp";
  timestamp: string;
  seconds: number;
}

export interface LinkSegment {
  type: "link";
  url: string;
  displayText: string;
}

export interface HashtagSegment {
  type: "hashtag";
  tag: string;
}

export type LineSegment =
  | TextSegment
  | TimestampSegment
  | LinkSegment
  | HashtagSegment;
