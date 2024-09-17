import { cloudinaryUploadImage } from "../utils/cloudinaryUtils.js";
// import { Image } from "../models/image.model.js";
export async function save(image : string | Buffer ){
     try{
          const url = await cloudinaryUploadImage(image,"og-mages");
          console.log("URL : " + url)
          
     }
     catch(error){
          console.log("Error upload " + error)
     }
}