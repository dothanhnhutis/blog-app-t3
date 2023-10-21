import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, content } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
        });
        if (!user) return null;
        const post = await ctx.prisma.post.create({
          data: {
            content,
            title,
            userId: ctx.session.user.id,
          },
        });
        return post;
      } catch (err: any) {
        console.log(err);
        return null;
      }
    }),
});
