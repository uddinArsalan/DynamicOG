import { Post } from "../models/post.model.js";
import { User, UserDocument } from "../models/user.model.js";
import { PostType, SocialLinksType } from "../types/index.js";
import { Templates } from "../models/templates.model.js";
import { ApiError } from "../utils/ApiError.js";

interface UserPayloadType {
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(
  email: string
): Promise<UserDocument | null> {
  return await User.findOne({ email });
}

export async function createUser(
  userData: UserPayloadType
): Promise<UserDocument> {
  return await User.create(userData);
}

export async function findUserById(id: string) {
  return await User.findById(id).select("-password -refreshToken");
}

export async function findByIdAndUpdate(id: string) {
  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        refreshAccessToken: undefined,
      },
    },
    { new: true }
  );
}

export async function updateSocialLinks(
  userId: string,
  socialLinkPayload: SocialLinksType
) {
  console.log(socialLinkPayload);
  await User.findOneAndUpdate(
    {
      _id: userId,
      "socialLinks.platform": socialLinkPayload.platform,
    },
    {
      $set: { "socialLinks.$.url": socialLinkPayload.url },
    },
    { upsert: true }
  );
}

export async function createPost(postDetails: PostType) {
  return await Post.create(postDetails);
}

export async function getPosts(userId: string) {
  return await Post.find({ author: userId }).select(
    "-author -template_id -logo_url -imageUrl"
  );
}

export async function deletePost(postId: string) {
  return await Post.findByIdAndDelete(postId);
}

export async function getUserTemplates(userId: string | null) {
  return await Templates.find({
    $or: [{ user_id: userId }, { isDefault: true }],
  });
}

export async function getTemplateJSX(templateId: string): Promise<string> {
  const template = await Templates.findById(templateId).select("jsx");
  if (!template) {
    throw new ApiError(404, "Invalid Template Id");
  }
  return template.jsx;
}

export async function generateAccessAndRefreshToken(user: UserDocument) {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error(
      "Something went wrong while generating access and refresh token"
    );
  }
}
