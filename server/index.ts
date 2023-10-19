import { otpRouter } from "./routers/otp";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  otp: otpRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
