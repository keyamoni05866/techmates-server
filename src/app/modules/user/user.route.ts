import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_Role } from "./user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";

const router = express.Router();

//get all car route
router.post("/create-user", auth(USER_Role.admin), UserControllers.createAUser);
router.get("/", auth(USER_Role.admin), UserControllers.getAllUser);

router.patch(
  "/:id",
  auth(USER_Role.admin, USER_Role.user),
  validateRequest(userValidations.updateUserValidations),
  UserControllers.updateSingleUser
);

router.delete("/:id", auth(USER_Role.admin), UserControllers.deleteUser);
export const UserRoutes = router;
