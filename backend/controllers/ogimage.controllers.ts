import { Request, Response } from "express";
import { generate } from "../services/og-img-generator.services.js";
import { saveAndUpload } from "../services/img-storage.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const generateOGImage = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new ApiError(404, "User not authenticated");
      }
      const { selectedTemplateId, title, content, imageUrl, logoUrl } =
        req.body;

      if (typeof title !== "string" || typeof content !== "string") {
        throw new ApiError(400, "Invalid title or content");
      }

      const image = await generate(
        selectedTemplateId,
        title,
        content,
        imageUrl,
        logoUrl
      );
      const userId = req.user._id;
      const ogImageUrl = await saveAndUpload({
        image,
        author: userId,
        template_id: selectedTemplateId,
        title,
        content,
        imageUrl,
        logo_url: logoUrl,
        ogImageUrl: undefined,
      });
      return res.json(
        new ApiResponse(200, { ogImageUrl }, "OG Image generated")
      );
    } catch (error) {
      console.error("Error generating OG image:", error);
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
);
