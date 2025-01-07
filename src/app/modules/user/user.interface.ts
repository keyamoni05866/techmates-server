import mongoose, { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  profilePicture?: string;
  bannerImage?: string;
  education?: string;
  livesIn?: string;
  from?: string;
  relation?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  transactionId?: string;
  paymentStatus?: "pending" | "paid";
  number?: string;
  status: "active" | "blocked";
};
export type TUserProfileUpdate = {
  name?: string;
  email?: string;
  role?: "user" | "admin";
  password?: string;
  profilePicture?: string;
  bannerImage?: string;
  education?: string;
  livesIn?: string;
  from?: string;
  relation?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  number?: string;
  status?: "active" | "blocked";
};

export interface UserModel {
  isPasswordMatched(
    plainTextPassword: string,
    hashTextPassword: string
  ): Promise<boolean>;
}
