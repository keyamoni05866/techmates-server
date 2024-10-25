import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";

import signInValidation from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";

const router = express.Router();

router.post(
  "/signup",

  AuthControllers.signup
);

router.post(
  "/signin",
  validateRequest(signInValidation),
  AuthControllers.signIn
);

export const AuthRoutes = router;
