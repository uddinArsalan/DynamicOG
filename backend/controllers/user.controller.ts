import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(201, { user: req.user }));
});
