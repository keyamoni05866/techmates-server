import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";

//creating a User by admin
const createAUser = catchAsync(async (req, res) => {
  const result = await UserServices.createAUser(req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `${result.role} Created Successfully`,
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

//get All User
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
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
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Single users retrieved successfully",
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
const updateSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateSingleUserFromDB(id, req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Profile Updated Successfully",
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

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteAUser(id);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Deleted successfully",
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

const followUser = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;
  const result = await UserServices.followUser(followerId, followingId);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `You are following`,
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
const unFollowUser = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;
  const result = await UserServices.unFollowUser(followerId, followingId);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `You are Unfollowing`,
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

const paymentUser = catchAsync(async (req, res) => {
  const email = req.user?.user?.email;
  const userData = req.body;
  const result = await UserServices.paymentSystemImplement(email, userData);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Payment Successful",
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

export const UserControllers = {
  createAUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  followUser,
  unFollowUser,
  paymentUser,
};
