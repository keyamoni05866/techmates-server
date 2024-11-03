import mongoose, { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  profilePicture?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  transactionId?: string;
  paymentStatus?: "pending" | "paid";
  number?: string;
  address?: string;
  status: "active" | "blocked";
};
export type TUserProfileUpdate = {
  name?: string;
  email?: string;
  role?: "user" | "admin";
  password?: string;
  profilePicture?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  number?: string;
  address?: string;
  status?: "active" | "blocked";
};

export interface UserModel {
  isPasswordMatched(
    plainTextPassword: string,
    hashTextPassword: string
  ): Promise<boolean>;
}
