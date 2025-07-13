import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

import { api } from "@/trpc/client";

export const useUpdateWatchHistoryMutation = ({
  videoId,
}: {
  videoId: string;
}) => {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const router = useRouter();
  const utils = api.useUtils();

  return api.courseView.updateLastWatchedVideo.useMutation({
    onSuccess: (res) => {
      if (res.updatedHistory.isCompleted && res.nextVideo) {
        if (res.nextVideo === "last-video") {
          toast.info("You have reached the last video in the course");
          return;
        }

        if (res.nextVideo) {
          router.push(`${pathname}?v=${res.nextVideo}`);
          toast.success("Video completed, redirecting to next video");
        }

        utils.courseView.getVideoList.setInfiniteData(
          { courseId: pathname.split("/").pop() ?? "", limit: 20 },
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                playlist: page.playlist.map((video) => {
                  if (video.id === videoId && video.watchHistory) {
                    return {
                      ...video,
                      watchHistory: {
                        ...video.watchHistory,
                        isCompleted: true,
                      },
                    };
                  }
                  return video;
                }),
              })),
            };
          }
        );
      }
    },
  });
};
