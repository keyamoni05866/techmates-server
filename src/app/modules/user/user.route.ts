import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_Role } from "./user.constant";

const router = express.Router();

//get all car route
router.post("/create-user", auth(USER_Role.admin), UserControllers.createAUser);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getSingleUser);

router.patch("/:id", auth(USER_Role.user), UserControllers.updateSingleUser);

router.delete("/:id", auth(USER_Role.admin), UserControllers.deleteUser);
export const UserRoutes = router;
