import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserTemplates } from "../db/DbOperations.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllTemplates = asyncHandler(async (req, res: Response) => {
  if (!req.user) {
    throw new ApiError(404, "User not authenticated");
  }
  const templates = await getUserTemplates(req.user._id);
  return res.json(
    new ApiResponse(200, { templates }, "Templates Fetched successfully")
  );
});
