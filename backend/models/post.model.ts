import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    template_id: {
      type: Schema.Types.ObjectId,
      ref: "Templates",
      required: true,
    },
    logo_url: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    ogImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
