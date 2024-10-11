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
  if (payload.oldPassword && payload.newPassword) {
    //password matching
    const user = await User.findOne({ email: payload.email });
    const passwordMatched = await isPasswordMatched(
      payload?.oldPassword,
      user!.password
    );
    if (!passwordMatched) {
      throw new AppError(401, "Password doesn't matched");
    }

    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_round)
    );

    const payloadData = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      password: newHashedPassword,
      termsConditionAccepted: payload.termsConditionAccepted,
      phone: payload.phone,
      address: payload.address,
    };
    const result = await User.findByIdAndUpdate(id, payloadData, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    const result = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  }
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
