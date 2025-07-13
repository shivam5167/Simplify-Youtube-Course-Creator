import { api } from "@/trpc/client";

export const useInfinitePlaylistItem = (courseId: string) => {
  return api.courseView.getVideoList.useSuspenseInfiniteQuery(
    {
      courseId,
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.totalPages > lastPage.currentPage
          ? lastPage.currentPage + 1
          : undefined,
    }
  );
};
