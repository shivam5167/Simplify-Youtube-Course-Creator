"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

import { PictureInPicture2Icon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import type { YouTubePlayer, YouTubeProps } from "react-youtube";
import YouTube from "react-youtube";

import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useMeasure } from "@/hooks/use-measure";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { useUpdateWatchHistoryMutation } from "../api/use-update-watch-history-mutation";
import { useVideoDetailsById } from "../api/use-video-details-by-id";
import { useVideoPlayer } from "../provider/video-player.provider";

interface Props {
  videoId: string;
}

const VideoPlayer: React.FC<Props> = ({ videoId }) => {
  const playerRef = useRef<YouTubePlayer | undefined>(undefined);
  const setPlayer = useVideoPlayer((state) => state.setPlayer);
  const setVideoPlayerHeight = useVideoPlayer(
    (state) => state.setVideoPlayerHeight
  );
  const isMounted = useRef(true);
  const isVideoCompleted = useRef(false);
  const isMobile = useIsMobile();
  const { ref: videoPlayerContainerRef, inView } = useInView({
    threshold: 0.5,
  });
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (height) {
      setVideoPlayerHeight(height);
    }
  }, [height, setVideoPlayerHeight]);

  // get the video details suspended
  const [videoData] = useVideoDetailsById(videoId);
  // update watch history mutation
  const { mutate: updateWatchHistory } = useUpdateWatchHistoryMutation({
    videoId,
  });

  // Player configuration memoized to prevent unnecessary re-renders
  const playerOpts = useMemo<YouTubeProps["opts"]>(
    () => ({
      width: "100%",
      height: "100%",
      playerVars: {
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        autoplay: 1,
        rel: 0,
        start: videoData?.watchHistory?.isRewatching
          ? 0
          : videoData?.watchHistory?.watchedDuration || 0,
      },
    }),
    [
      videoData?.watchHistory?.isRewatching,
      videoData?.watchHistory?.watchedDuration,
    ]
  );

  // Handle component mount/unmount tracking
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Player ready handler
  const handleReady = useCallback(
    (event: { target: YouTubePlayer }) => {
      playerRef.current = event.target;
      setPlayer(event.target);
    },
    [setPlayer]
  );

  // Optimized history update with progress check and debouncing
  const updateHistory = useDebouncedCallback(() => {
    if (!playerRef.current) return;
    const currentTime = Math.floor(playerRef.current.getCurrentTime());
    updateWatchHistory({
      videoId,
      videoProgress: currentTime,
      totalDuration: Math.floor(playerRef.current.playerInfo.duration),
    });
  }, 1000);

  // Save progress on unmount if video wasn't completed
  useEffect(
    () => () => {
      if (!isMounted.current && !isVideoCompleted.current) {
        updateWatchHistory({
          videoId,
          videoProgress: Math.floor(playerRef.current?.getCurrentTime() || 0),
          totalDuration: Math.floor(
            playerRef.current?.playerInfo?.duration || 0
          ),
        });
      }
    },
    [updateWatchHistory, videoId]
  );

  // Video end handler
  const handleVideoEnd = useCallback(() => {
    isVideoCompleted.current = true;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    updateWatchHistory({
      videoId,
      videoProgress: Math.floor(playerRef.current.getCurrentTime()),
      shouldMarkAsCompleted: true,
      totalDuration: Math.floor(playerRef.current.playerInfo.duration),
      shouldGoToNextVideo: true,
    });
  }, [videoId, updateWatchHistory]);

  // console.log({ playerRef });

  return (
    <div
      ref={videoPlayerContainerRef}
      className="sticky top-[var(--header)] z-40 aspect-video rounded-lg bg-primary-90 md:relative md:top-0"
    >
      <div className="relative aspect-video" ref={ref}>
        <div className="absolute inset-0 hidden aspect-video flex-col items-center justify-center text-sm md:flex">
          <PictureInPicture2Icon />
          <p>Playing in picture in picture mode</p>
        </div>
        <YouTube
          videoId={videoData?.videoExist?.youtube_video_id || ""}
          id="video-player"
          opts={playerOpts}
          loading="eager"
          onReady={handleReady}
          onPause={updateHistory}
          onEnd={handleVideoEnd}
          className={cn(
            "z-40 aspect-video overflow-hidden md:rounded-lg",
            inView && !isMobile
              ? "md:relative md:top-0 md:animate-videoInline"
              : "md:fixed md:bottom-6 md:right-6 md:w-80 md:animate-videoSticky md:border-2 md:border-border md:shadow-lg"
          )}
        />
      </div>
    </div>
  );
};

export default memo(VideoPlayer);
