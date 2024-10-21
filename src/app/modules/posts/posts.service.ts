import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Post } from "./post.model";
import { TPost, TUpdatePost } from "./posts.interface";

const createPostIntoDB = async (payload: TPost) => {
  const result = (await Post.create(payload)).populate("author");
  return result;
};

const getAllPostFromDB = async () => {
  const result = await Post.find()
    .populate("author")
    .populate("comments.user")
    .sort({ createdAt: -1 });
  return result;
};
const getMyPostFromDB = async (email: string) => {
  const getUser = await User.findOne({ email });
  const userId = getUser?._id;
  console.log(userId);
  const result = await Post.find({
    author: userId,
  })
    .populate("author")
    .populate("comments.user")
    .sort({ createdAt: -1 });

  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById({ _id: id })
    .populate("author")
    .populate("comments.user");
  return result;
};

const updatePostFromDB = async (
  id: string,
  email: string,
  payload: TUpdatePost
) => {
  const getPost = await Post.findById({ _id: id });
  const getUser = await User.findOne({ email });
  if (!getUser) {
    throw new AppError(401, "You are not authorized user");
  }
  if (getPost && getUser) {
    if (getPost.author.toString() !== getUser._id.toString()) {
      throw new Error("You can't change this You are not this post author");
    }
  }
  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deletePostFromDB = async (id: string, email: string) => {
  const getPost = await Post.findById({ _id: id });
  const getUser = await User.findOne({ email });
  if (!getUser) {
    throw new AppError(401, "You are not authorized user");
  }
  if (getPost && getUser) {
    if (getPost.author.toString() !== getUser._id.toString()) {
      throw new Error("You can't change this You are not this post author");
    }
  }
  const result = await Post.findByIdAndDelete(id);
  return result;
};

const voteForPostFromDB = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post Not Found");
  }
  const getUser = await User.findById(userId);
  if (!getUser) {
    throw new Error("User not found");
  }
  const user = getUser._id;
  if (post.author.equals(user)) {
    throw new Error("You can not vote your post");
  }

  const hasVoted = post.VotedUsers?.includes(user);
  if (hasVoted) {
    post.VotedUsers = post.VotedUsers?.filter((id) => !id.equals(user));
    post.Votes = (post.Votes || 1) - 1;
  } else {
    post.VotedUsers?.push(user);
    post.Votes = (post.Votes || 0) + 1;
  }
  const updatedPost = await post.save();
  await updatedPost.populate("author");

  return updatedPost;
};

const postCommentFromDB = async (
  id: string,
  email: string,
  payload: Record<string, undefined>
) => {
  const { comment } = payload;
  const getPost = await Post.findById(id);
  if (!getPost) {
    throw new Error("Post not found");
  }
  const getUser = await User.findOne({ email });
  if (!getUser) {
    throw new Error("User not Found");
  }
  const result = await Post.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          user: getUser._id,
          comment: comment,
        },
      },
    },
    { new: true }
  )
    .populate("author")
    .populate("comments.user");

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  updatePostFromDB,
  getMyPostFromDB,
  deletePostFromDB,
  voteForPostFromDB,
  postCommentFromDB,
};
