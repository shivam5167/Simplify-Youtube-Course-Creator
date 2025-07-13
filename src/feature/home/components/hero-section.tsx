import Image from "next/image";
import Link from "next/link";

import { FilmIcon, UserPlus2Icon } from "lucide-react";

import YouTubeIcon from "@/assets/icons/youtube";
import TrueFocus from "@/components/shared/focus-text";
import LoginButton from "@/components/shared/login-button";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Spotlight } from "@/components/ui/spotlight-new";

import { Background } from "./background";
import HeroVideoDialog from "./hero-video-dialog";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="relative mt-[var(--header)] flex min-h-[calc(100dvh-var(--header))] w-full items-center justify-center overflow-hidden">
        <Spotlight />
        {/* youtube */}
        <div className="absolute left-0 top-0 z-20 max-w-60 scale-[60%] rounded-2xl border-2 border-border bg-background p-2 shadow-lg md:left-[5%] md:top-[5%] md:scale-100">
          <div className="flex items-center gap-1 px-2 pb-1 text-sm font-semibold text-[#ff0000]">
            <YouTubeIcon /> Youtube
          </div>
          <div
            className="flex aspect-video max-h-[4.5rem] w-full items-center justify-center rounded-lg bg-muted"
            aria-label="video playing"
          >
            <FilmIcon />
          </div>
          <div>
            <div className="my-1.5 flex items-center gap-0.5">
              <Image
                src={"/images/avatar.svg"}
                unoptimized
                alt="youtube chanel"
                width={56}
                height={56}
                className="size-6 select-none rounded-full object-cover"
                priority
              />
              <div>
                <p className="text-sm font-semibold">Channel name</p>
                <p className="-mt-1 text-xs font-medium text-muted-foreground">
                  1.2k Subscribers
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="max-h-20 w-full overflow-hidden rounded-lg">
                <Image
                  src={"/images/thumbnail.webp"}
                  width={2400}
                  height={400}
                  priority
                  alt="thumbnail"
                  className="size-full select-none overflow-hidden rounded-lg"
                />
              </div>
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white">
                Play next
              </p>
            </div>
          </div>
        </div>
        {/* simplify */}
        <div className="absolute bottom-[5%] right-[5%] z-20 flex max-w-60 -rotate-3 scale-[60%] sm:justify-center md:bottom-[10%] md:right-[10%] md:scale-100 lg:justify-end">
          <div className="relative flex w-fit flex-col rounded-md border border-border bg-background/90 p-2 font-mono text-[clamp(8px,0.77vw,13px)] shadow backdrop-blur-sm lg:rounded-lg">
            <div className="gap-1 px-2 pb-1 font-rubik-gemstone text-sm font-medium">
              Simplify
            </div>
            <div
              className="aspect-video max-h-[4.5rem] w-full overflow-hidden rounded-md"
              aria-label="watching educational video with any interruption on playlistGenius"
            >
              <Image
                src={"/images/bacteria.jpg"}
                alt="thumbnail"
                width={400}
                height={400}
                priority
                className="size-full select-none overflow-hidden"
              />
            </div>
            <div className="my-2">
              <div className="flex items-center gap-0.5">
                <Button
                  className="h-5 rounded-sm rounded-b-none border-b-2 border-primary p-0 px-1 text-xs"
                  variant={"ghost"}
                >
                  Description
                </Button>
                <Button
                  className="h-5 rounded-sm p-0 px-1 text-xs"
                  variant={"ghost"}
                >
                  Notes
                </Button>
                <Button
                  className="h-5 rounded-sm p-0 px-1 text-xs"
                  variant={"ghost"}
                >
                  Friends
                </Button>
              </div>
            </div>
            <div>
              <p className="line-clamp-3 text-sm font-semibold">
                Bacteria are microscopic, single-celled organisms that exist
                everywhere—from deep oceans to human bodies. They come in
                various shapes like rods, spheres, and spirals. While some
                bacteria cause diseases, many are essential for life, helping in
                digestion, decomposing waste, and even producing medicines.
                These tiny creatures reproduce rapidly, adapting to extreme
                conditions. From beneficial probiotics to harmful pathogens,
                bacteria play a crucial role in nature and science.
                Understanding them helps in medicine, biotechnology, and
                environmental protection. Stay tuned to our channel for
                fascinating insights into the unseen world of bacteria and their
                impact on our lives!
              </p>
            </div>
          </div>
        </div>
        <div className="absolute right-[20%] top-[10%] z-10">
          <span className="block size-10 rounded-xl border bg-background px-1.5 shadow-lg">
            <YouTubeIcon className="size-full" />
          </span>
          <span className="absolute -bottom-3 left-4 block text-nowrap rounded-md bg-background-20 px-1 text-sm font-medium shadow-md">
            😔 Confused and distracted
          </span>
        </div>
        <div className="absolute bottom-10 left-0 z-20 hidden md:bottom-[20%] md:left-[20%] md:block">
          <span className="flex flex-col items-center justify-center rounded-xl border bg-background px-1.5 py-1 font-rubik-gemstone text-sm font-medium shadow-lg">
            <UserPlus2Icon className="size-4" />
            Simplify
          </span>
          <span className="absolute -bottom-4 left-4 block text-nowrap rounded-md bg-background-20 px-1 text-sm font-medium shadow-md">
            😀🎉 Happily learning for simplify without distraction
          </span>
        </div>
        {/* hero text */}
        <div className="container relative z-40 -mt-10 overflow-x-clip md:-mt-20">
          <TrueFocus sentence="From Chaos to Clarity" />
          <h2 className="relative mx-auto mt-1 max-w-screen-lg text-center text-[min(5vw,1rem)] text-secondary-foreground/80 sm:text-[min(1.65vw,1.25rem)] md:-mt-1">
            Simplify converts your youtube playlist into a well-structured
            course. Where you keep track of your learning progress, take notes,
            connect with your classmates, and share your progress.
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <LoginButton
              className="h-11 rounded-lg"
              variant={"secondary"}
              size={"lg"}
            >
              Get Started
            </LoginButton>
            <RainbowButton asChild className="text-sm font-medium">
              <Link
                href={{
                  query: {
                    "create-dialog": "true",
                  },
                }}
              >
                Import playlist
              </Link>
            </RainbowButton>
          </div>
        </div>
      </div>

      {/* video */}
      <div className="container -mt-10 flex w-full items-center justify-center pb-20">
        <HeroVideoDialog
          thumbnailSrc="/images/hero-thumbnail.png"
          videoSrc="/videos/hero-video.webm"
          thumbnailAlt="Thumbnail for the video"
        />
      </div>
      <Background />
    </div>
  );
};

export default HeroSection;
