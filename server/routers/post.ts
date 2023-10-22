import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  get: protectedProcedure.query(async ({ ctx, input }) => {
    const posts = await ctx.prisma.post.findMany();
    console.log(posts);
    return posts;
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
        thumnail: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
        });
        if (!user) return null;
        const post = await ctx.prisma.post.create({
          data: input,
        });
        return post;
      } catch (err: any) {
        console.log(err);
        return null;
      }
    }),
});
