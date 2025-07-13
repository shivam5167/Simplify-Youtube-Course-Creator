"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { CircleAlertIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/client";

import AddNewNote from "./add-new-note";
import EditAndViewNotes from "./edit-and-view-note";

type Props = {
  videoId: string;
};

const VideoNotes = (props: Props) => {
  const [data] = api.notes.getNotesByVideoId.useSuspenseQuery(props.videoId);
  const [isOpen, setIsOpen] = useState(false);
  const [noteId, setNoteId] = useState<string | undefined>(undefined);
  const utils = api.useUtils();

  const deleteMutation = api.notes.deleteNote.useMutation({
    onSuccess: () => {
      utils.notes.getNotesByVideoId.setData(props.videoId, (prev) => {
        if (!prev) return [];
        return prev.filter((note) => note.id !== noteId);
      });
      setIsOpen(false);
      toast.success("Note deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleDeleteDialog = useCallback(
    (id?: string) => {
      if (deleteMutation.isPending) return;
      if (isOpen) {
        setIsOpen(false);
        setNoteId(undefined);
        return;
      } else {
        setNoteId(id);
        setIsOpen(true);
      }
    },
    [deleteMutation.isPending, isOpen]
  );

  const handDelete = useCallback(() => {
    if (!noteId) return;
    deleteMutation.mutate({
      noteId,
    });
  }, [deleteMutation, noteId]);

  if (!data.length) {
    return (
      <div>
        <AddNewNote videoId={props.videoId} />
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/images/no-notes.svg"}
            unoptimized
            className="select-none"
            width={300}
            height={300}
            alt="No notes"
          />
          <p className="-mt-8 text-sm font-semibold text-muted-foreground">
            No notes added yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AddNewNote videoId={props.videoId} />
      <ul className="mt-2 space-y-5">
        {data.map((note) => (
          <li key={note.id}>
            <EditAndViewNotes
              handleDelete={toggleDeleteDialog}
              note={note}
              videoId={props.videoId}
            />
          </li>
        ))}
      </ul>

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <CircleAlertIcon
                className="opacity-80"
                size={16}
                strokeWidth={2}
              />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your note? All your data will be
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handDelete}
                disabled={deleteMutation.isPending}
                variant="destructive"
              >
                {deleteMutation.isPending ? (
                  <>
                    <LoaderIcon
                      className="-ms-1 me-2 animate-spin opacity-60"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2Icon
                      className="-ms-1 me-2 opacity-60"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Delete
                  </>
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const VideoNotesLoadingSkeleton = () => {
  return (
    <div>
      {/* Add Note Button Skeleton */}
      <div className="mb-4">
        <Skeleton className="ml-auto h-10 w-full max-w-[150px] rounded-md" />
      </div>

      {/* Notes List Skeleton */}
      <ul className="mt-5 space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <div className="relative">
              {/* Action Buttons Skeleton */}
              <div className="absolute -top-4 right-2 flex space-x-1">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              {/* Note Content Skeleton */}
              <Skeleton className="h-[120px] w-full rounded-md" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoNotes;
