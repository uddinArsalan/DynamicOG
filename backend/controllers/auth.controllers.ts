import { Request, Response } from "express";
import { registerValidator, loginValidator } from "../validations/schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { authService } from "../services/auth.services.js";
import { COOKIE_OPTIONS } from "../config/cookieConfig.js";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = await registerValidator.validate(
      req.body
    );

    const user = await authService.registerUser(name, email, password);
    return res
      .status(201)
      .json(new ApiResponse(201, { user }, "User registered successfully"));
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = await loginValidator.validate(req.body);

  const { accessToken, refreshToken, user } = await authService.loginUser(
    email,
    password
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 1 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, { user }, "User logged in successfully"));
});

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken: string | undefined = req.cookies.refreshToken;

    const { accessToken, refreshToken } = await authService.refreshAccessToken(
      incomingRefreshToken
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 1 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(new ApiResponse(200, {}, "Access Token refreshed successfully"));
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logoutUser(req.user._id);
  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
