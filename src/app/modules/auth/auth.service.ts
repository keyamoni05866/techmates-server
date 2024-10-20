import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TSignInUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.util";
import jwt from "jsonwebtoken";
//sign up for user and admin
const signup = async (payload: TUser) => {
  //if user exists
  const getUser = await User.findOne({ email: payload.email });
  if (getUser) {
    throw new AppError(400, "The User is already Exists.");
  }

  payload.role = "user";

  const user = await User.create(payload);

  const jwtPayload = {
    user,
  };

  //access token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  //refresh token

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return {
    user,
    token,
    refreshToken,
  };
};

//sign in for user and admin
const signin = async (payload: TSignInUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(401, "User doesn't Exists");
  }
  //password matching

  const passwordMatched = await isPasswordMatched(
    payload?.password,
    user?.password
  );
  if (!passwordMatched) {
    throw new AppError(401, "Password doesn't matched");
  }

  //access granted: now sending access token
  const jwtPayload = {
    user,
  };

  //access token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  //refresh token

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return {
    user,
    token,
    refreshToken,
  };
};

const getSingUserFromDB = async (id: string) => {
  const result = await User.findById({ _id: id });

  return result;
};

export const AuthServices = {
  signup,
  signin,
  getSingUserFromDB,
};
