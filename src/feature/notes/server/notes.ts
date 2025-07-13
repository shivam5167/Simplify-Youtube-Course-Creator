import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { notes } from "@/drizzle/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

import { checkVideoExistAndIsEnrolledByVideoId } from "../db";

export const notesRouter = createTRPCRouter({
  getNotesByVideoId: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const { isEnrolled, videoExist } =
        await checkVideoExistAndIsEnrolledByVideoId({
          videoId: input,
          userId: ctx.sessionRes.user.id,
        });

      if (!isEnrolled || !videoExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      // get the notes
      const existingNotes = await ctx.db
        .select()
        .from(notes)
        .where(
          and(
            eq(notes.videoId, input),
            eq(notes.userId, ctx.sessionRes.user.id)
          )
        )
        .orderBy(desc(notes.createdAt));

      return existingNotes;
    }),

  createNote: protectedProcedure
    .input(
      z.object({
        videoId: z.string().uuid(),
        content: z.string().trim().min(1),
        timestamp: z.number().min(0),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { content, timestamp, videoId } = input;
      const { id } = ctx.sessionRes.user;

      // check if video exists
      const { isEnrolled, videoExist } =
        await checkVideoExistAndIsEnrolledByVideoId({
          videoId,
          userId: id,
        });

      if (!isEnrolled || !videoExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      // insert the note
      const [newNote] = await ctx.db
        .insert(notes)
        .values({
          content,
          timestamp: timestamp.toString(),
          videoId,
          userId: id,
        })
        .returning();

      if (!newNote) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create note",
        });
      }

      return newNote;
    }),

  editNote: protectedProcedure
    .input(
      z.object({
        noteId: z.string().uuid(),
        content: z.string().trim().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { content, noteId } = input;
      const { id } = ctx.sessionRes.user;

      // check if note exists
      const existingNote = await ctx.db
        .select()
        .from(notes)
        .where(and(eq(notes.id, noteId), eq(notes.userId, id)));

      if (!existingNote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      // update the note
      const [updatedNote] = await ctx.db
        .update(notes)
        .set({ content })
        .where(and(eq(notes.id, noteId), eq(notes.userId, id)))
        .returning();

      if (!updatedNote) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not update note",
        });
      }

      return updatedNote;
    }),

  deleteNote: protectedProcedure
    .input(
      z.object({
        noteId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { noteId } = input;
      const { id } = ctx.sessionRes.user;

      // check if note exists
      const [existingNote] = await ctx.db
        .select()
        .from(notes)
        .where(and(eq(notes.id, noteId), eq(notes.userId, id)));

      if (!existingNote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      // delete the note
      const [deletedNote] = await ctx.db
        .delete(notes)
        .where(and(eq(notes.id, noteId), eq(notes.userId, id)))
        .returning();

      if (!deletedNote) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not delete note",
        });
      }

      return deletedNote;
    }),
});
