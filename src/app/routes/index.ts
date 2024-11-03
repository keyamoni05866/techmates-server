import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/posts/posts.route";
import { UserRoutes } from "../modules/user/user.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
