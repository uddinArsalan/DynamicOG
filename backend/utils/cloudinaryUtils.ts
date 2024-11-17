import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";
import { promises as fs } from "fs";
import { ApiError } from "./ApiError.js";

export async function cloudinaryUploadImage(
  image: string | Buffer ,path : string
) {
  let imageBuffer: Buffer;
  if (Buffer.isBuffer(image)) {
    imageBuffer = image;
  } else if (typeof image === "string") {
    imageBuffer = await fs.readFile(image);
  } else {
    throw new ApiError(404,"Unexpected result type");
  }
  try {
    const uploadResult: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: path },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(imageBuffer);
      }
    );

    return uploadResult?.secure_url;
  } catch (error : unknown ) {
    console.error("Error generating or uploading image:", error);
  }
}
