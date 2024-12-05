import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return "Hi";
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    // return ctx.db.query.Post.findMany({
    //   orderBy: desc(Post.id),
    //   limit: 10,
    // });
  }),
  protected: protectedProcedure.query(({ ctx }) => {
    return `User ID read from server is: ${ctx.auth.userId}`;
  }),

  // byId: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ ctx, input }) => {
  //     // return ctx.db
  //     //   .select()
  //     //   .from(schema.post)
  //     //   .where(eq(schema.post.id, input.id));

  //     return ctx.db.query.Post.findFirst({
  //       where: eq(Post.id, input.id),
  //     });
  //   }),

  // create: protectedProcedure
  //   .input(CreatePostSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(Post).values(input);
  //   }),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(Post).where(eq(Post.id, input));
  // }),
} satisfies TRPCRouterRecord;
