import { Request, Response } from "express";
import { cloudinaryUploadImage } from "../utils/cloudinaryUtils";
import { unlinkSync, existsSync } from "fs";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler";
export const uploadFileController = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const uploadResults: { [key: string]: string | undefined } = {};
    try {
      for (const [fieldName, fileArray] of Object.entries(files)) {
        const file = fileArray[0];
        if (file) {
          const fileUrlPath = file.path;
          const secure_url = await cloudinaryUploadImage(
            fileUrlPath,
            "temp-images"
          );
          uploadResults[fieldName] = secure_url;

          unlinkSync(fileUrlPath);
        }
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            201,
            { uploadResults },
            "Files uploaded to cloudinary"
          )
        );
    } catch (error) {
      // Delete any remaining files from the server
      for (const fileArray of Object.values(files)) {
        const file = fileArray[0];
        if (file && existsSync(file.path)) {
          unlinkSync(file.path);
        }
      }

      console.error("Error uploading files:", error);
      throw new ApiError(500, "An error occurred during file upload.");
    }
  }
);
