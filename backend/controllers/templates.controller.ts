import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUserTemplates } from "../db/DbOperations";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getAllTemplates = asyncHandler(async (req, res: Response) => {
  if (!req.user) {
    throw new ApiError(404, "User not authenticated");
  }
  const templates = await getUserTemplates(req.user._id);
  return res.json(
    new ApiResponse(200, { templates }, "Templates Fetched successfully")
  );
});
