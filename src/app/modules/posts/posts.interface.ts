import { Types } from "mongoose";

export type TComments = {
  _id?: string;
  user: Types.ObjectId;
  comment: string;
};

export type TPost = {
  title: string;
  content: string;
  image?: string;
  category: string;
  author: Types.ObjectId;
  Votes?: number;
  views?: number;
  VotedUsers?: Types.ObjectId[];
  isPremium: boolean;
  comments?: TComments[];
};
export type TUpdatePost = {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
  isPremium?: boolean;
};

export type TPostsQuery = {
  searchQuery?: string;
  selectedCategory?: string;
};
