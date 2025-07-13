import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const LastAccessedLoader: FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="mt-4 w-full">
      <div>
        <h3 className="text-lg font-medium text-muted-foreground">
          {title || "Last accessed videos"}
        </h3>
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="flex w-full flex-col gap-3 overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow"
          >
            <Skeleton className="aspect-video w-full rounded-md" />
            <Skeleton className="h-6 w-3/4" />

            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-2 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-md" />
          </li>
        ))}
      </div>
    </div>
  );
};
