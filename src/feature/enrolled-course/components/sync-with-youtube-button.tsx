"use client";

import { useCallback, useState } from "react";

import { VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

import YouTubeIcon from "@/assets/icons/youtube";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";

type Props = {
  courseId: string;
  variants?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
};

const SyncWithYouTube = ({
  courseId,
  variants = "default",
  size = "default",
  className,
}: Props) => {
  const [toastId, setToastId] = useState<string | undefined | number>(
    undefined
  );
  const sync = api.enrolledCourse.syncWithYoutube.useMutation({
    onSuccess: (res) => {
      toast.success(res.message, {
        id: toastId,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        id: toastId,
      });
    },
    onMutate: () => {
      setToastId(toast.loading("Syncing with YouTube..."));
    },
  });

  const handleSync = useCallback(() => {
    sync.mutate({ courseId });
  }, [courseId, sync]);

  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      variant={variants}
      size={size}
      onClick={handleSync}
      disabled={sync.isPending}
    >
      {!sync.isPending ? (
        <>
          <YouTubeIcon /> Sync with YouTube
        </>
      ) : (
        <>
          <LoaderIcon className="animate-spin [animation-duration:1s]" />{" "}
          syncing...
        </>
      )}
    </Button>
  );
};

export default SyncWithYouTube;
