import { Request, Response } from "express";
import { cloudinaryUploadImage } from "../utils/cloudinaryUtils.js";
import { unlinkSync, existsSync } from "fs";
// import path from "path";

export const uploadFileController = async (req: Request, res: Response) => {
  let fileUrlPath: string | undefined;

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    // fileUrlPath = path.join('./public/temp-images', req.file.filename);
    fileUrlPath = req.file.path;
    
    const secure_url = await cloudinaryUploadImage(fileUrlPath, "temp-images");

    // Once the file is uploaded, delete it from server
    unlinkSync(fileUrlPath);

    return res.status(200).json(secure_url);
  } catch (error) {
    // Delete the file from the server if it exists
    if (fileUrlPath && existsSync(fileUrlPath)) {
      unlinkSync(fileUrlPath);
    }

    console.error("Error uploading file:", error);
    return res.status(500).send("An error occurred during file upload.");
  }
};
