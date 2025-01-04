import { cloudinaryUploadImage } from "../utils/cloudinaryUtils";
import { PostType } from "../types/index";
import { createPost } from "../db/DbOperations";

type PostDetails = PostType & {
  image: string | Buffer;
};

export async function saveAndUpload({
  image,
  author,
  template_id,
  title,
  content,
  imageUrl,
  logo_url,
}: PostDetails) {
  try {
    const url = await cloudinaryUploadImage(image, "og-mages");

    await createPost({
      author,
      template_id,
      title,
      content,
      imageUrl,
      logo_url,
      ogImageUrl: url,
    });

    return url;
  } catch (error) {
    console.log("Error upload " + error);
  }
}
