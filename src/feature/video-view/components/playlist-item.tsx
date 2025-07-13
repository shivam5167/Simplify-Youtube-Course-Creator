"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useEffect } from "react";

import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { RouterOutputs } from "@/trpc/client";

import { useVideoPlayer } from "../provider/video-player.provider";

type Props = {
  video: RouterOutputs["courseView"]["getVideoList"]["playlist"][number];
};

const PlayListItem = ({ video }: Props) => {
  const searchParams = useSearchParams();
  const setActiveVideoTitle = useVideoPlayer(
    (state) => state.setActiveVideoTitle
  );

  useEffect(() => {
    if (searchParams.get("v") === video.id) {
      document.getElementById(video.id)?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveVideoTitle(video.title);
    }
  }, [searchParams, setActiveVideoTitle, video.id, video.title]);

  return (
    <li
      className={cn(
        "group relative max-w-full rounded-lg border p-2 focus-within:ring-1 focus-within:ring-border focus-within:ring-offset-1 focus-within:ring-offset-background",
        searchParams.get("v") === video.id &&
          "border-2 border-border bg-background shadow",
        video?.watchHistory?.isCompleted &&
          "border-2 border-dashed border-[#0e793c] bg-[#e8faf0] text-[#0e793c] dark:border-[#095028] dark:bg-[#02140a] dark:text-[#17c964]"
      )}
      id={video.id}
    >
      <Link
        href={{
          query: {
            v: video.id,
          },
        }}
        className={cn(
          "flex cursor-pointer items-center space-x-2 focus-visible:outline-none"
        )}
      >
        <div className="relative aspect-video w-28 shrink-0 shadow-lg">
          <Image
            src={video.thumbnail ?? ""}
            alt={video.title}
            width={320}
            height={180}
            className="size-full rounded-lg object-cover"
          />
          {searchParams.get("v") === video.id && (
            <div
              aria-label="playing view current active video"
              className="absolute inset-0 grid place-content-center rounded-lg bg-primary-10/25"
            >
              <div
                aria-hidden
                className="flex h-6 w-9 items-end justify-center gap-0.5"
              >
                <div className="max-h-full w-full animate-loading-wave rounded-sm bg-blue-600/80 [animation-delay:0s]" />
                <div className="max-h-full w-full animate-loading-wave rounded-sm bg-blue-600/80 [animation-delay:0.5s]" />
                <div className="max-h-full w-full animate-loading-wave rounded-sm bg-blue-600/80 [animation-delay:0.75s]" />
                <div className="max-h-full w-full animate-loading-wave rounded-sm bg-blue-600/80 [animation-delay:1s]" />
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="line-clamp-2 text-sm font-semibold group-hover:underline group-hover:underline-offset-1">
            {video.title}
          </p>
          <time
            dateTime={video.publishedAt}
            className="text-xs font-medium text-muted-foreground"
          >
            {formatDistanceToNow(video.publishedAt, {
              addSuffix: true,
            })}
          </time>
        </div>
      </Link>
    </li>
  );
};

export default memo(PlayListItem);
