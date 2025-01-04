import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { PostType } from "../types/index";
import { createPost, deletePost, getPosts } from "../db/DbOperations";
import { ApiResponse } from "../utils/ApiResponse";

export const createPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const postDetails: PostType = req.body;
    await createPost(postDetails);
    return res
      .status(201)
      .json(new ApiResponse(201, {}, "Og image created successfully"));
  }
);

export const GetUserOGPostsController = asyncHandler(
  async (req: Request, res: Response) => {
    const posts = await getPosts(req.user._id);
    return res
      .status(201)
      .json(new ApiResponse(201, { posts }, "User OG Posts fetched"));
  }
);

export const DeleteUserOGPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    await deletePost(id as string);
    return res
      .status(201)
      .json(new ApiResponse(201, {}, "User OG Posts Deleted"));
  }
);
