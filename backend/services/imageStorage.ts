import { cloudinaryUploadImage } from "../utils/cloudinaryUtils.js";
export async function save(image: string | Buffer) {
  try {
    const url = await cloudinaryUploadImage(image, "og-mages");
    
  } catch (error) {
    console.log("Error upload " + error);
  }
}
