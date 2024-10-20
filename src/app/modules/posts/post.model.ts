import { model, Schema, Types } from "mongoose";
import { TPost } from "./posts.interface";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String },
});

const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    Votes: { type: Number, default: 0 },
    VotedUsers: [{ type: Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    isPremium: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export const Post = model<TPost>("Post", postSchema);
