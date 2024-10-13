import express from "express";

import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";
import { PostsControllers } from "./posts.controller";

const router = express.Router();

//get all car route
router.post("/create-post", auth(USER_Role.user), PostsControllers.createPost);
router.get("/myPosts", auth(USER_Role.user), PostsControllers.getMyPost);
router.patch("/:postId", auth(USER_Role.user), PostsControllers.updatePost);
router.delete("/:postId", auth(USER_Role.user), PostsControllers.deletePost);

export const PostRoutes = router;
