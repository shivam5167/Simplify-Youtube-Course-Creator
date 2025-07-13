"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ArchiveIcon, ArchiveRestoreIcon, StarIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";

type Props = {
  enrolledCourseId: string;
  className?: string;
  isArchived?: boolean;
  isBookmarked?: boolean;
};

const ArchiveAndBookmarkButton = ({
  enrolledCourseId,
  className,
  isArchived,
  isBookmarked,
}: Props) => {
  const router = useRouter();

  const bookmarkMutation = api.enrolledCourse.bookmarkToggler.useMutation({
    onSuccess: (res) => {
      router.refresh();
      toast.success(
        res.isBookMarked ? "Course bookmarked" : "Course un-bookmarked"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const archiveMutation = api.enrolledCourse.archiveToggler.useMutation({
    onSuccess: (res) => {
      router.refresh();
      toast.success(res.isArchived ? "Course archived" : "Course un-archived");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleBookmark = useCallback(() => {
    bookmarkMutation.mutate({
      enrollmentId: enrolledCourseId,
    });
  }, [bookmarkMutation, enrolledCourseId]);
  const handleArchive = useCallback(() => {
    archiveMutation.mutate({
      enrollmentId: enrolledCourseId,
    });
  }, [archiveMutation, enrolledCourseId]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className={cn("flex flex-wrap gap-1", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              className="size-8 rounded-full border-2 border-border text-xs shadow-md"
              onClick={handleArchive}
              disabled={archiveMutation.isPending}
            >
              {!isArchived ? (
                <ArchiveRestoreIcon className="" />
              ) : (
                <ArchiveIcon className="fill-slate-400 dark:fill-slate-300" />
              )}
              <span className="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isArchived ? "Unarchive the course" : "Archive the course"}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              className="size-8 rounded-full border-2 border-border text-xs shadow-md"
              onClick={handleBookmark}
              disabled={bookmarkMutation.isPending}
            >
              <StarIcon
                className={cn(
                  isBookmarked
                    ? "fill-yellow-400 stroke-yellow-600"
                    : "fill-gray-400 stroke-gray-700"
                )}
              />
              <span className="sr-only">Bookmark</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isBookmarked ? "Remove bookmark" : "Bookmark the course"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ArchiveAndBookmarkButton;
