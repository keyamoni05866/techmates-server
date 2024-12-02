import express from "express";

import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";
import { PostsControllers } from "./posts.controller";

const router = express.Router();

//get all post route
router.get("/", PostsControllers.getAllPost);
router.get("/myPosts", auth(USER_Role.user), PostsControllers.getMyPost);
router.get("/analytics", auth(USER_Role.user), PostsControllers.PostAnalytics);
router.get("/all-analytics", PostsControllers.allPostAnalytics);
router.get("/:id", PostsControllers.getSinglePost);
router.post("/create-post", auth(USER_Role.user), PostsControllers.createPost);
router.patch("/:postId", auth(USER_Role.user), PostsControllers.updatePost);
router.patch(
  "/comment/:postId",
  auth(USER_Role.user),
  PostsControllers.postComment
);
router.patch(
  "/comment-update/:postId",
  auth(USER_Role.user),
  PostsControllers.postCommentUpdate
);
router.patch(
  "/comment-delete/:postId",
  auth(USER_Role.user),
  PostsControllers.postCommentDelete
);
router.patch("/vote/:postId", auth(USER_Role.user), PostsControllers.VotePost);
router.delete("/:postId", auth(USER_Role.user), PostsControllers.deletePost);
// admin side delete
router.delete(
  "/post-delete/:postId",
  auth(USER_Role.admin),
  PostsControllers.deletePostByAdmin
);

export const PostRoutes = router;
