import mongoose from "mongoose";
import { TUser, TUserProfileUpdate } from "./user.interface";
import { User } from "./user.model";

const createAUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateSingleUserFromDB = async (
  id: string,
  payload: TUserProfileUpdate
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

// Follow a user
const followUser = async (followerId: string, followingId: string) => {
  const userId = new mongoose.Types.ObjectId(followerId);
  const targetUserId = new mongoose.Types.ObjectId(followingId);

  if (userId.equals(targetUserId)) {
    throw new Error("You cannot follow yourself");
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    throw new Error("User not found");
  }

  if (user.following!.includes(targetUserId)) {
    throw new Error("You are already following this user");
  }
  user.following?.push(targetUserId);
  targetUser.followers?.push(userId);

  await user.save();
  await targetUser.save();
  return { user };
};
// Unfollow a user
const unFollowUser = async (followerId: string, followingId: string) => {
  const userId = new mongoose.Types.ObjectId(followerId);
  const targetUserId = new mongoose.Types.ObjectId(followingId);

  if (userId.equals(targetUserId)) {
    throw new Error("You cannot unfollow yourself");
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    throw new Error("User not found");
  }

  if (!user.following!.includes(targetUserId)) {
    throw new Error("You are not following");
  }
  user.following = user.following?.filter((id) => !id.equals(targetUserId));
  targetUser.followers = targetUser.followers?.filter(
    (id) => !id.equals(userId)
  );

  await user.save();
  await targetUser.save();
  return { user };
};

export const UserServices = {
  createAUser,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteAUser,
  followUser,
  unFollowUser,
};
