import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

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

    termsConditionAccepted: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
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

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

//this is for password hiding
// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   return userObject;
// };

export const User = model<TUser>("User", userSchema);
