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

//get All Car
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
const updateSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateSingleUserFromDB(id, req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Updated Successfully",
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

export const UserControllers = {
  createAUser,
  getAllUser,
  updateSingleUser,
  deleteUser,
};
