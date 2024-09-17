import mongoose, { Schema } from "mongoose";

const processedImageSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", processedImageSchema);
