"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMeasure } from "@/hooks/use-measure";
import { api } from "@/trpc/client";

const YouTubeDescription = dynamic(() => import("./description-renderer"), {
  ssr: false,
});

interface VideoDescriptionProps {
  videoId: string;
}
const VideoDescription: React.FC<VideoDescriptionProps> = ({ videoId }) => {
  const [videoDetails] = api.courseView.getVideoById.useSuspenseQuery(videoId);
  const [containerRef, { height: measuredHeight }] = useMeasure();
  const [isExpended, setIsExpended] = useState(false);

  return (
    <div className="relative w-full">
      <h2 className="text-lg font-semibold md:text-2xl">
        {videoDetails.videoExist.title}
      </h2>
      <Separator className="my-2 bg-foreground/10" />
      <motion.div
        animate={{
          height: isExpended ? "auto" : 150,
        }}
        initial={false}
        className="overflow-hidden"
      >
        <div className="mt-2 w-full" ref={containerRef}>
          <YouTubeDescription
            description={videoDetails?.videoExist?.description ?? ""}
          />
        </div>
        {measuredHeight !== 150 && !isExpended && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-80 via-primary-80/50 to-transparent" />
        )}
        {measuredHeight !== 150 && (
          <Button
            onClick={() => setIsExpended((prev) => !prev)}
            className="absolute bottom-0 left-1/2 -translate-x-1/3 rounded-full md:-bottom-10"
            size={"sm"}
          >
            {isExpended ? "Collapse" : "View Details"}
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default VideoDescription;
