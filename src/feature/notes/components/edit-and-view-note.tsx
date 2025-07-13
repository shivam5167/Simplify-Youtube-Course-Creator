import { useCallback, useRef, useState } from "react";

import { Loader, PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import AutosizeTextarea, {
  AutosizeTextAreaRef,
} from "@/components/shared/auto-resize-text-area";
import { Button } from "@/components/ui/button";
import { useVideoPlayer } from "@/feature/video-view/provider/video-player.provider";
import { cn, convertTimestampToSeconds, secondsToTimestamp } from "@/lib/utils";
import { RouterOutputs, api } from "@/trpc/client";

type Props = {
  videoId: string;
  note: RouterOutputs["notes"]["getNotesByVideoId"][number];
  handleDelete: (id: string) => void;
};

const EditAndViewNotes = ({ videoId, note, handleDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<AutosizeTextAreaRef>(null);
  const [hasEdited, setHasEdited] = useState(false);
  const [content, setContent] = useState(note.content);
  const utils = api.useUtils();
  const player = useVideoPlayer((state) => state.player);

  const updateMutation = api.notes.editNote.useMutation({
    onSuccess: (res) => {
      setHasEdited(false);
      setIsEditing(false);
      utils.notes.getNotesByVideoId.setData(videoId, (prev) => {
        if (!prev) return [];
        return prev.map((n) => {
          if (n.id === note.id) {
            return res;
          }
          return n;
        });
      });
      if (!ref?.current) return;

      ref.current.textArea.style.minHeight = "auto";
      ref.current.textArea.style.height = "auto"; // reset height
      toast.success("Note updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleEditing = useCallback(() => {
    if (!ref.current) return;
    if (isEditing) {
      setIsEditing(false);
      ref.current.textArea.style.minHeight = "auto";
      ref.current.textArea.style.height = "auto";
    } else {
      setIsEditing(true);
      ref.current?.textArea.focus();
      ref.current.textArea.style.minHeight = "208px";
    }
  }, [isEditing]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      setHasEdited(true);
    },
    []
  );

  const onUpdateNote = useCallback(() => {
    updateMutation.mutate({
      noteId: note.id,
      content,
    });
  }, [content, note.id, updateMutation]);

  const timestampHandler = useCallback(() => {
    const sec = convertTimestampToSeconds(note.timestamp || "0");
    player.seekTo(sec, true);
  }, [note.timestamp, player]);

  return (
    <div>
      <div className="flex gap-2 pb-1.5">
        <p className="text-sm text-muted-foreground">Timestamp : </p>
        <Button
          onClick={timestampHandler}
          size={"sm"}
          className="h-auto rounded-full py-0.5"
          disabled={!note.timestamp}
        >
          {secondsToTimestamp(parseInt(note.timestamp || "0") ?? 0) ||
            "Not Captured"}
        </Button>
      </div>

      <div className="relative">
        {!isEditing && (
          <div className="absolute -top-4 right-2 space-x-1">
            <Button
              className="size-8 rounded-full"
              variant="destructive"
              size={"sm"}
              onClick={() => handleDelete(note.id)}
            >
              <TrashIcon size={16} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">delete note</span>
            </Button>
            <Button
              className="size-8 rounded-full bg-emerald-600 dark:bg-emerald-400"
              size={"sm"}
              onClick={toggleEditing}
            >
              <PencilIcon
                size={16}
                className="text-emerald-950"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="sr-only">edit note</span>
            </Button>
          </div>
        )}
        <AutosizeTextarea
          ref={ref}
          className={cn(
            "read-only:cursor-auto read-only:bg-muted read-only:focus-visible:ring-0",
            isEditing ? "resize-y" : "resize-none"
          )}
          defaultValue={content}
          onChange={handleContentChange}
          readOnly={!isEditing}
          placeholder="Add your note here"
          minHeight={0}
          maxHeight={500}
        />
        {isEditing && (
          <div className="absolute bottom-2 right-2 flex flex-row justify-end gap-2">
            <Button
              onClick={toggleEditing}
              variant={"secondary"}
              className="h-8"
              size="sm"
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={onUpdateNote}
              disabled={updateMutation.isPending}
              className="h-8"
              size="sm"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader className="animate-spin text-muted" /> updating...
                </>
              ) : hasEdited ? (
                "unsaved"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAndViewNotes;
