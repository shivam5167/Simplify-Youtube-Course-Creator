import { api } from "@/trpc/client";

export const useVideoDetailsById = (id: string) => {
  return api.courseView.getVideoById.useSuspenseQuery(id, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
