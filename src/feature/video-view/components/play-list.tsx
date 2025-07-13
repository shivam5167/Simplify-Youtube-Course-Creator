"use client";

import { forwardRef } from "react";

import InfiniteLoading from "@/components/shared/infinite-loading";
import { cn } from "@/lib/utils";

import { useInfinitePlaylistItem } from "../api/use-infinite-playlist-item";
import PlaylistItem from "./playlist-item";

interface Props {
  courseId: string;
  className?: string;
}

const PlayList = forwardRef<HTMLUListElement, Props>(
  ({ courseId, className }, ref) => {
    const [{ pages }, infiniteQuery] = useInfinitePlaylistItem(courseId);

    return (
      <ul
        ref={ref}
        className={cn("w-full space-y-2 overflow-x-auto px-1", className)}
      >
        {pages.map((page) =>
          page.playlist.map((video) => (
            <PlaylistItem key={video.id} video={video} />
          ))
        )}

        <InfiniteLoading
          isFetchingNextPage={infiniteQuery.isFetchingNextPage}
          hasNextPage={infiniteQuery.hasNextPage}
          fetchNextPage={infiniteQuery.fetchNextPage}
        />
      </ul>
    );
  }
);

PlayList.displayName = "PlayList";

export default PlayList;
