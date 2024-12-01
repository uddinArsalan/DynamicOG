import { Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/authUtils.js";
import { findUserById } from "../db/dbOperations.js";

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      console.log(req.cookies);
      const token =
        req.cookies.accessToken ||
        req.headers["authorization"]?.replace("Bearer", "");
      console.log(token);
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }
      const decodedToken = await verifyAccessToken(token);
      console.log(decodedToken);
      const user = await findUserById(decodedToken._id);
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = user;
      console.log(user);
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
