import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
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
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ogImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
