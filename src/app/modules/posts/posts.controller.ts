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
  //   console.log(req);
  const email = req.user?.user?.email;
  //   console.log(email);
  const result = await PostServices.getMyPostFromDB(email);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Retrieved Successfully`,
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
const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Post Retrieved Successfully`,
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
const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Single Post Retrieved Successfully`,
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
  const email = req.user?.user?.email;
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
  const email = req.user?.user?.email;
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

const VotePost = catchAsync(async (req, res) => {
  const userId = req.user?.user?._id;
  // console.log(userId);
  const { postId } = req.params;
  // console.log(postId);
  const result = await PostServices.voteForPostFromDB(postId, userId);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Vote Updated`,
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
const postComment = catchAsync(async (req, res) => {
  const email = req.user?.user?.email;
  // console.log(userId);
  const { postId } = req.params;
  // console.log(postId);
  const result = await PostServices.postCommentFromDB(postId, email, req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Thanks for your comment`,
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
const postCommentUpdate = catchAsync(async (req, res) => {
  const email = req.user?.user?.email;
  // console.log(userId);
  const { postId } = req.params;
  // console.log(postId);
  const result = await PostServices.postCommentUpdateFromDB(
    postId,
    email,
    req.body
  );
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Update Your Comment`,
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
const postCommentDelete = catchAsync(async (req, res) => {
  const email = req.user?.user?.email;
  // console.log(userId);
  const { postId } = req.params;
  // console.log(postId);

  const { commentId } = req.body;
  // console.log(commentId);
  const result = await PostServices.postCommentDeleteFromDB(
    postId,
    email,
    commentId
  );
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Delete Your Comment`,
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
  getAllPost,
  getSinglePost,
  getMyPost,
  updatePost,
  deletePost,
  VotePost,
  postComment,
  postCommentUpdate,
  postCommentDelete,
};
