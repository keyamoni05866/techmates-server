import mongoose, { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcryptjs from "bcryptjs";
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    verified: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    transactionId: { type: String },
    number: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    education: {
      type: String,
    },
    livesIn: {
      type: String,
    },
    from: {
      type: String,
    },
    relation: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

//hashing password

// userSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcryptjs.hash(
//     user.password,
//     Number(config.bcrypt_salt_round)
//   );
//   next();
// });

// userSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_round)
//   );
//   next();
// });

//this is for password hiding
// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   return userObject;
// };

export const User = model<TUser>("User", userSchema);
