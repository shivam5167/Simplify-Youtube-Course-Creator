import { useRef } from "react";

import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

import { api } from "@/trpc/client";

export default function useCreateCourseMutation() {
  const toastId = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  return api.playlistToCourse.createCourseFromPlayList.useMutation({
    onError: (error) => {
      toast.error(error.message, {
        id: toastId.current,
      });
    },
    onSuccess: () => {
      router.push("/dashboard/courses");
      toast.success("Course created successfully", {
        id: toastId.current,
      });
    },
    onMutate: () => {
      toastId.current = toast.loading("Creating course...");
    },
  });
}
