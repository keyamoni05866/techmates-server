import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";

import { AuthServices } from "./auth.service";

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);

  if (result) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Registration Successful",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthServices.signin(req.body);
  const { user, token, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: { user, token },
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});
export const AuthControllers = {
  signup,
  signIn,
};
