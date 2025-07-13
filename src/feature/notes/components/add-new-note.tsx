import { useCallback, useRef, useState } from "react";

import { Loader } from "lucide-react";
import { toast } from "sonner";

import AutosizeTextarea, {
  AutosizeTextAreaRef,
} from "@/components/shared/auto-resize-text-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useVideoPlayer } from "@/feature/video-view/provider/video-player.provider";
import { cn, secondsToTimestamp } from "@/lib/utils";
import { api } from "@/trpc/client";

type Props = {
  videoId: string;
};

const AddNewNote = ({ videoId }: Props) => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [hasEdited, setHasEdited] = useState(false);
  const textareaRef = useRef<AutosizeTextAreaRef>(null);
  const playRef = useVideoPlayer((state) => state.player);
  const [capturedTime, setCapturedTime] = useState<number | undefined>(
    undefined
  );
  const utils = api.useUtils();

  const handleToggle = useCallback(() => {
    if (isAddNoteOpen) {
      setIsAddNoteOpen(false);
    } else {
      if (!capturedTime) setCapturedTime(playRef?.getCurrentTime());
      setIsAddNoteOpen(true);
    }
  }, [capturedTime, isAddNoteOpen, playRef]);

  const createMutation = api.notes.createNote.useMutation({
    onSuccess: (res) => {
      utils.notes.getNotesByVideoId.setData(videoId, (prev) => {
        if (!prev) return [res];
        return [res, ...prev];
      });
      setContent("");
      setHasEdited(false);
      setIsAddNoteOpen(false);
      setCapturedTime(undefined);
      toast.success("Note added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSaveNote = useCallback(() => {
    createMutation.mutate({
      videoId,
      content,
      timestamp: playRef?.getCurrentTime() || 0,
    });
  }, [content, createMutation, playRef, videoId]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      setHasEdited(true);
    },
    []
  );

  const timestampHandler = useCallback(() => {
    playRef.seekTo(secondsToTimestamp(playRef?.getCurrentTime() || 0), true);
  }, [playRef]);

  return (
    <div className="mb-2 mt-3">
      {!isAddNoteOpen && (
        <div className="flex justify-end">
          <Button size={"sm"} onClick={handleToggle}>
            Add Note
          </Button>
        </div>
      )}
      <div className={cn("mt-2", isAddNoteOpen ? "block" : "hidden")}>
        <div className="flex gap-2 pb-3">
          <p className="text-sm text-muted-foreground">Timestamp : </p>
          <Button
            onClick={timestampHandler}
            size={"sm"}
            className="h-auto rounded-full py-0.5"
          >
            {secondsToTimestamp(
              parseInt(capturedTime?.toString() || "0") ?? 0
            ) || "Not Captured"}
          </Button>
        </div>
        <div className="group relative">
          <Label className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50">
            Notes
          </Label>
          <AutosizeTextarea
            minHeight={208}
            ref={textareaRef}
            className="pb-9"
            value={content}
            autoFocus
            onChange={handleContentChange}
            placeholder="Write your note here..."
            disabled={createMutation.isPending}
          />
          <div className="absolute bottom-2 right-2 flex flex-row justify-end gap-2">
            <Button
              onClick={handleToggle}
              variant={"outline"}
              className="h-8"
              size="sm"
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={onSaveNote}
              disabled={createMutation.isPending}
              className="h-8"
              size="sm"
            >
              {createMutation.isPending ? (
                <>
                  <Loader className="animate-spin text-muted" /> saving...
                </>
              ) : hasEdited ? (
                "unsaved"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewNote;
