import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PostType } from "../types/index.js";
import { createPost } from "../db/DbOperations.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const postDetails: PostType = req.body;
    await createPost(postDetails);
    return res
      .status(201)
      .json(new ApiResponse(201, { }, "Og image created successfully"));
  }
);
