import { signUp } from "@/lib/auth-client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/trpc/trpc";

import { signInSchema } from "../schema";

export const userRoute = createTRPCRouter({
  register: publicProcedure.input(signInSchema).mutation(async ({ input }) => {
    const res = await signUp.email({
      email: input.email,
      password: input.password,
      name: `${input.firstName} ${input.lastName}`,
      callbackURL: "/",
    });

    if (res.error) {
      throw res.error;
    }

    return res.data;
  }),

  getUserSession: protectedProcedure.query(async ({ ctx }) => {
    const res = ctx.sessionRes;
    if (!res) {
      throw new Error("User session not found");
    }
    return res;
  }),
});
