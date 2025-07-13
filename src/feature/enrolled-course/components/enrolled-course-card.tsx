import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GraduationCapIcon, VideoIcon } from "lucide-react";

import UserAvatar from "@/components/shared/use-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { RouterOutputs } from "@/trpc/client";

import ArchiveAndBookmarkButton from "./archive-and-bookmark-button";
import SyncWithYouTube from "./sync-with-youtube-button";

interface Props {
  course: RouterOutputs["enrolledCourse"]["get"][number]["course"];
  author: RouterOutputs["enrolledCourse"]["get"][number]["author"];
  lastAccessedVideo: string;
  enrollmentId: string;
  isArchived: boolean;
  isBookmarked: boolean;
}

const EnrolledCourseCard: React.FC<Props> = ({
  course,
  author,
  lastAccessedVideo,
  isArchived,
  isBookmarked,
  enrollmentId,
}) => {
  return (
    <li className="grid grid-rows-subgrid overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow [grid-row:span_5]">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src={course.thumbnail ?? ""}
          alt={course.title}
          width={1080}
          height={720}
          className="size-full select-none object-cover"
        />
        <div className="absolute right-2 top-4 mx-auto flex w-[calc(100%-1rem)] flex-wrap justify-between gap-1">
          <Badge className="space-x-1 text-xs font-normal">
            <VideoIcon className="size-[1.2em] text-inherit" />{" "}
            {course.video_count} {course.video_count === 1 ? "video" : "videos"}
          </Badge>
          <ArchiveAndBookmarkButton
            isArchived={isArchived}
            isBookmarked={isBookmarked}
            enrolledCourseId={enrollmentId}
          />
        </div>
      </div>

      <CardTitle className="line-clamp-2">{course.title}</CardTitle>

      <CardDescription className="line-clamp-3">
        {course?.description ||
          "The author of the course has not provided any description."}
      </CardDescription>

      <div className="">
        <UserAvatar
          customUrl={author.customUrl ?? ""}
          title={author.name}
          avatar={author.imgUrl}
          count={author.subscriberCount}
          className="size-8"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3 md:flex-row">
        <SyncWithYouTube
          variants={"secondary"}
          className="w-full"
          courseId={course.id}
        />
        <Button className="w-full" asChild>
          <Link
            href={{
              pathname: `/dashboard/courses/${course.id}`,
              query: { v: lastAccessedVideo },
            }}
          >
            Start learning
            <GraduationCapIcon />
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default EnrolledCourseCard;
