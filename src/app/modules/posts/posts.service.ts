import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Post } from "./post.model";
import { TPost, TUpdatePost } from "./posts.interface";

const createPostIntoDB = async (payload: TPost) => {
  const result = (await Post.create(payload)).populate("author");
  return result;
};

const getMyPostFromDB = async (email: string) => {
  const getUser = await User.findOne({ email });
  const userId = getUser?._id;
  const result = await Post.find({
    author: userId,
  })
    .populate("user")
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

export const PostServices = {
  createPostIntoDB,
  updatePostFromDB,
  getMyPostFromDB,
  deletePostFromDB,
};
