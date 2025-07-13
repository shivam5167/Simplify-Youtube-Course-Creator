import { api } from "@/trpc/client";

export const useWatchHistoryQuery = ({
  videoId,
  enabled,
}: {
  videoId: string;
  enabled: boolean;
}) => {
  return api.courseView.getWatchHistoryById.useQuery(
    {
      videoId,
    },
    {
      enabled,
    }
  );
};
