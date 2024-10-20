import config from "../../config";
import AppError from "../../errors/AppError";
import { isPasswordMatched } from "../auth/auth.util";
import { TUser, TUserProfileUpdate } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createAUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
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

export const UserServices = {
  createAUser,
  getAllUserFromDB,
  updateSingleUserFromDB,
  deleteAUser,
};
