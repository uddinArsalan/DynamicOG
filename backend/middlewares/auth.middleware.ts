import { Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/authUtils.js";
import { findUserById } from "../db/db-ops.js";

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken ||
        req.headers["authorization"]?.replace("Bearer", "");
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }
      const decodedToken = await verifyAccessToken(token);
      const user = await findUserById(decodedToken._id);
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = user;
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
