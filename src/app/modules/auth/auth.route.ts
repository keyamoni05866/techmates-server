import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";

import signInValidation from "./auth.validation";
import { userValidations } from "../user/user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations.createUserValidations),
  AuthControllers.signup
);
router.post(
  "/signin",
  validateRequest(signInValidation),
  AuthControllers.signIn
);

export const AuthRoutes = router;
