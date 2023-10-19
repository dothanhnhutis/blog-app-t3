import { generateOTPCode } from "@/util";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { sendMail } from "@/util/nodemailer";
export const otpRouter = router({
  get: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        type: z.enum(["SIGNINUP", "RESETPASSWORD"] as const),
      })
    )
    .query(async ({ ctx, input }) => {
      const otp = await ctx.prisma.otp.findFirst({
        where: {
          verified: false,
          expireAt: { gte: new Date(Date.now()) },
          ...input,
        },
      });
      return otp;
    }),
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        type: z.enum(["SIGNINUP", "RESETPASSWORD"] as const),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const otp = await ctx.prisma.otp.findFirst({
        where: {
          verified: false,
          expireAt: { gte: new Date(Date.now()) },
          ...input,
        },
      });
      const code = otp?.code ?? generateOTPCode();

      if (!otp) {
        await ctx.prisma.otp.create({
          data: {
            code,
            expireAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
            ...input,
          },
        });
      }
      const data = {
        from: 'I.C.H Verify Email" <gaconght@gmail.com>',
        to: input.email,
        subject: "I.C.H Verify Email",
        html: `<b>code: ${code}</b>`,
      };
      return await sendMail(data);
    }),
  validated: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const otp = await ctx.prisma.otp.update({
        where: { id: input },
        data: { verified: true },
      });
      return otp;
    }),
});
