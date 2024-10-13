import { catchAsync } from "../../utils/catchAsync";
import { PostServices } from "./posts.service";

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Created Successfully`,
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
const getMyPost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await PostServices.getMyPostFromDB(email);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Created Successfully`,
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

const updatePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  const result = await PostServices.updatePostFromDB(postId, email, req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Updated Successfully`,
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
const deletePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  const result = await PostServices.deletePostFromDB(postId, email);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Deleted`,
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

export const PostsControllers = {
  createPost,
  getMyPost,
  updatePost,
  deletePost,
};
