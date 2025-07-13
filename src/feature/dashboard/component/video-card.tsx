import Image from "next/image";
import Link from "next/link";

import { TvMinimalPlayIcon } from "lucide-react";

import UserAvatar from "@/components/shared/use-avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { RouterOutputs } from "@/trpc/client";

type Props = {
  videoDetail: RouterOutputs["dashboard"]["lastAccessVideos"][number];
};

const VideoCard = async ({ videoDetail }: Props) => {
  return (
    <li className="grid grid-rows-subgrid overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow [grid-row:span_5]">
      <div className="relative aspect-video overflow-hidden rounded-md border-2 bg-background-70">
        <Image
          src={videoDetail.thumbnail ?? "/images/no-thumbnail.svg"}
          alt={videoDetail.title}
          width={1080}
          height={720}
          className="size-full select-none object-cover"
          priority
        />
      </div>

      <CardTitle className="line-clamp-2">{videoDetail.title}</CardTitle>

      <div className="">
        <UserAvatar
          customUrl={videoDetail.author.customUrl ?? ""}
          title={videoDetail.author.name}
          avatar={videoDetail.author.imgUrl}
          count={videoDetail.author.subscriberCount}
          className="size-8"
        />
      </div>

      <div className="relative my-2 h-2 max-w-full rounded-xl border bg-background-70">
        <div
          className="absolute inset-0 rounded-xl bg-emerald-500"
          style={{
            width: `${((videoDetail?.watchDuration ?? 0) / (videoDetail?.totalDuration ?? 1)) * 100}%`,
          }}
        />
      </div>

      <div className="w-full">
        <Button className="w-full" asChild>
          <Link
            href={{
              pathname: `/dashboard/courses/${videoDetail.courseId}`,
              query: { v: videoDetail.id },
            }}
          >
            Continue watching
            <TvMinimalPlayIcon />
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default VideoCard;
