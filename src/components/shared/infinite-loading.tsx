import { useEffect } from "react";

import { useInView } from "react-intersection-observer";

import { Button } from "../ui/button";

type Props = {
  inManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const InfiniteLoading = ({
  inManual,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !inManual) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inManual, inView, isFetchingNextPage]);

  return (
    <div>
      <div ref={ref} className="h-1" />
      {hasNextPage ? (
        <Button
          onClick={fetchNextPage}
          className="w-full"
          size={"sm"}
          disabled={isFetchingNextPage}
          variant={"secondary"}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      ) : (
        <div>
          <p className="text-center text-sm text-muted-foreground">
            You have reached at end
          </p>
        </div>
      )}
    </div>
  );
};

export default InfiniteLoading;
