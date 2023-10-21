import { otpRouter } from "./routers/otp";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  otps: otpRouter,
  users: userRouter,
  posts: postRouter,
});

export type AppRouter = typeof appRouter;
