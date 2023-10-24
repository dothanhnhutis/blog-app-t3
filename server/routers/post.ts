import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        thumnail: z.string(),
        name: z.string(),
        content: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { thumnail, name, authorId, content } }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
        });
        if (!user) return null;
        const post = await ctx.prisma.post.create({
          data: {
            name,
            thumnail,
            slug: "slug-post",
            content,
            author: {
              connect: {
                id: user.id,
              },
            },
            category: {
              create: {
                name: "create name",
              },
            },
          },
        });
        return post;
      } catch (err: any) {
        console.log(err);
        return null;
      }
    }),
});
