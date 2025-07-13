"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { PlayIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

interface HeroVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const HeroVideoDialog = ({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = useCallback(() => {
    setIsVideoOpen((prev) => {
      return !prev;
    });
    window.document.body.style.overflow = isVideoOpen ? "auto" : "hidden";
  }, [isVideoOpen]);

  useEffect(() => {
    const abortController = new AbortController();

    window.document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          if (!isVideoOpen) return;
          handleVideoOpen();
        }
      },
      {
        signal: abortController.signal,
      }
    );

    return () => {
      abortController.abort();
    };
  }, [handleVideoOpen, isVideoOpen]);

  return (
    <div className={cn("relative size-full", className)}>
      <motion.button
        className="group relative block size-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        onClick={handleVideoOpen}
        layoutId="video-dialog"
      >
        <span className="sr-only">Open video dialog</span>
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-xl border shadow-xl transition-all duration-200 ease-out group-hover:brightness-[0.8]"
          priority
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <div
              className={
                "relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
              }
            >
              <PlayIcon
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </motion.button>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleVideoOpen}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              layoutId="video-dialog"
              className="relative mx-4 aspect-video w-full max-w-6xl md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute -top-10 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
                onClick={handleVideoOpen}
              >
                <XIcon className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-muted/50">
                <video
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  autoPlay
                  loop
                ></video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroVideoDialog;
