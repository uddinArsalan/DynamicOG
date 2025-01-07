import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updateSocialLinks } from "../db/db-ops.js";

export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(201, { user: req.user }));
});

export const updateLinkController = asyncHandler(
  async (req: Request, res: Response) => {
    const { socialLinkPayload } = req.body;
    const userId = req.user._id;
    await updateSocialLinks(userId, socialLinkPayload);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Social Links Updated"));
  }
);
