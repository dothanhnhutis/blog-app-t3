import { hashPassword } from "@/util";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUserByEmail: publicProcedure
    .input(z.string().email())
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input },
      });
      return user;
    }),
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .max(40)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/
          ),
        otp: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const otp = await ctx.prisma.otp.findUnique({
        where: {
          code_email: {
            code: input.otp,
            email: input.email,
          },
        },
      });
      if (!otp) return false;
      const hash = hashPassword(input.password);
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: hash,
          username: input.email,
          avatarUrl: "",
        },
      });
      return user;
    }),
});
