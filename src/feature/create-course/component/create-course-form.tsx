"use client";

import Image from "next/image";
import React, { FC, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ListVideoIcon } from "lucide-react";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { useForm } from "react-hook-form";

import AlertMessage from "@/components/shared/alter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/lib/utils";

import useCreateCourseMutation from "../api/use-create-course-mutation";
import { ImportPlaylistSchemaType, importPlaylistSchema } from "../schema";

interface Props {
  showTrigger?: boolean;
  className?: string;
}

const CreateCourseForm: React.FC<Props> = ({
  showTrigger = true,
  className,
}) => {
  const [step, setStep] = useQueryState(
    "course-step",
    parseAsInteger
      .withOptions({
        history: "replace",
        scroll: false,
      })
      .withDefault(1)
  );
  const [isOpen, setIsOpen] = useQueryState(
    "create-dialog",
    parseAsBoolean
      .withOptions({
        history: "replace",
        scroll: false,
        clearOnDefault: true,
      })
      .withDefault(false)
  );

  const form = useForm<ImportPlaylistSchemaType>({
    resolver: zodResolver(importPlaylistSchema),
    defaultValues: {
      url: "",
    },
    mode: "onChange",
  });

  const courseMutation = useCreateCourseMutation();

  const handelSubmit = useCallback((data: ImportPlaylistSchemaType) => {
    if (courseMutation.isPending) return;
    courseMutation.mutate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <RainbowButton className={className}>
            <ListVideoIcon />
            Import playlist
          </RainbowButton>
        </DialogTrigger>
      )}
      <DialogContent className="-mt-7 md:max-w-screen-md">
        <DialogHeader>
          {step === 2 && (
            <Button
              variant="link"
              className="mr-auto px-0 text-foreground"
              onClick={() => setStep(1)}
              disabled={courseMutation.isPending}
            >
              <ChevronLeft
                className="me-1 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Go back
            </Button>
          )}
          <DialogTitle>Create a new course</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new course
          </DialogDescription>
        </DialogHeader>
        {step === 1 ? (
          <StepOne onNext={setStep} />
        ) : (
          <div>
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(handelSubmit)}
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube playlist link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={courseMutation.isPending}
                          autoFocus
                          placeholder="Enter youtube playlist url"
                        />
                      </FormControl>
                      <FormDescription>
                        Make sure the playlist is public
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertMessage message={courseMutation.error?.message} />
                <div className="mt-4 flex gap-4">
                  <DialogClose asChild>
                    <Button
                      variant={"secondary"}
                      className="w-full"
                      type="button"
                      disabled={courseMutation.isPending}
                      onClick={() => setStep(1)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="w-full">Confirm and create</Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface StepOneProps {
  onNext: (value: number) => void;
}

const StepOne: FC<StepOneProps> = ({ onNext }) => {
  const [courseType, setCourseType] = useQueryState(
    "course-type",
    parseAsStringEnum(["import", "custom"]).withOptions({
      history: "replace",
      scroll: false,
    })
  );

  return (
    <div>
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <button
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border-2 px-3 py-2 shadow-md transition-transform hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95",
            courseType === "import" && "ring-2 ring-primary"
          )}
          onClick={() => setCourseType("import")}
        >
          <Image
            src={"/images/import.svg"}
            width={30}
            height={30}
            alt="import playlist"
            className="size-8 shrink-0 select-none rounded-full border-2 border-primary object-cover"
          />
          <div>
            <p className="text-start font-semibold">Import playlist</p>
            <p className="-mt-1 text-sm font-medium text-secondary-foreground">
              Import a playlist from YouTube.
            </p>
          </div>
        </button>

        {/* <Link
          href={"/dashboard/course/create"}
          className="flex w-full items-center gap-2 rounded-lg border-2 px-3 py-2 shadow-md transition-transform hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
        >
          <Image
            src={"/images/import.svg"}
            width={30}
            height={30}
            alt="import playlist"
            className="size-8 shrink-0 select-none rounded-full border-2 border-primary object-cover"
          />
          <div>
            <p className="text-start font-semibold">Create New</p>
            <p className="-mt-1 text-sm font-medium text-secondary-foreground">
              Create a new course from scratch.
            </p>
          </div>
        </Link> */}
      </div>

      {courseType === "import" && (
        <div className="mt-5">
          <Button className="w-full" onClick={() => onNext(2)}>
            Proceed to next step 😃➡️
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateCourseForm;
